export type WarehouseBranch = "detected" | "fallback";
export type WarehouseStep = "input" | "detector" | "region" | "ranking";

export const warehouseSteps: { id: WarehouseStep; label: string }[] = [
  { id: "input", label: "1. Input" },
  { id: "detector", label: "2. YOLO detector" },
  { id: "region", label: "3. Region / fallback" },
  { id: "ranking", label: "4. CNN ranking" },
];

export const illustrativeWarehouseRegions = [
  { id: "a", x: 24, y: 26, width: 72, height: 52 },
  { id: "b", x: 138, y: 34, width: 140, height: 104 },
  { id: "c", x: 72, y: 144, width: 64, height: 38 },
] as const;

// Neutral geometry explains the inspected selection rule; these are not detections.
export function warehouseDiagramState(step: WarehouseStep, branch: WarehouseBranch) {
  const selectionVisible = step === "region" || step === "ranking";
  const largest = illustrativeWarehouseRegions.reduce((a, b) => a.width * a.height >= b.width * b.height ? a : b);
  return {
    regions: branch === "detected" && step !== "input" ? illustrativeWarehouseRegions : [],
    selectedId: branch === "detected" && selectionVisible ? largest.id : null,
    fullImageSelected: branch === "fallback" && selectionVisible,
    inputLabel: branch === "detected" ? "Largest crop" : "Whole image",
  };
}

// Text model of the inspected test.py, not inference or a captured prediction.
export function warehouseStepDetail(step: WarehouseStep, branch: WarehouseBranch) {
  switch (step) {
    case "input": return {
      title: "Read an image, not a sample shown here",
      body: "The script gathers image files recursively from IMAGES_ROOT. Folder names provide class labels for evaluation. No input photo or same-image prediction trace is retained in the reviewed archive.",
      source: "test.py:20–26, 45–47, 69–71, 110",
    };
    case "detector": return {
      title: "Find candidate regions with pretrained YOLOv8",
      body: "yolo.predict supplies bounding boxes. Detection locates regions; the separate CNN ranks warehouse categories. save=False means this call does not save detector-overlay images. CUDA is used when available, otherwise CPU.",
      source: "test.py:25–26, 66–67, 83–92",
    };
    case "region": return branch === "detected" ? {
      title: "Detected regions → largest crop",
      body: "When boxes exist, the script computes each bounding-box area and selects the largest bounding-box area with argmax. It crops that region from the RGB image, rather than choosing by classifier score or classifying every box.",
      source: "test.py:95–103",
    } : {
      title: "No detected regions → full-image fallback",
      body: "If boxes are absent or empty, the script passes the whole RGB image to classify_pil. This is a classification fallback, not a successful object detection and not an error result.",
      source: "test.py:95–105",
    };
    case "ranking": return {
      title: "Resize → CNN → ranked categories",
      body: `The ${branch === "detected" ? "selected crop" : "full image"} is resized and converted to a tensor. SmallCNN scores are converted with softmax, then topk returns up to five category/probability pairs. These are classifier rankings, not detector scores; no probabilities or predicted labels are generated here.`,
      source: "test.py:45, 51–64",
    };
  }
}
