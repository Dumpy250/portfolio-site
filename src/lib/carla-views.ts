export type CarlaScreenshot = Readonly<{
  src: string;
  width: number;
  height: number;
  alt: string;
}>;

type CarlaRecordedView = Readonly<{
  id: string;
  label: string;
  title: string;
  caption: string;
  notice: string;
  original: CarlaScreenshot;
  details: readonly (CarlaScreenshot & Readonly<{ title: string }>)[];
}>;

// Reviewed release captures and detail crops, not reconstructed chart data.
export const carlaViews = [
  {
    id: "explorer",
    label: "Run Explorer",
    title: "Inspect a saved session",
    caption: "Review a saved run’s summary, telemetry, and recorded events.",
    notice: "The summary and recorded entries can be inspected together. The visible timeline includes N/A simulation timestamps; this view does not establish event-to-telemetry alignment.",
    original: {
      src: "/projects/carla-explorer.png",
      width: 1357,
      height: 1262,
      alt: "Recorded Run Explorer showing saved-run metadata, summary statistics, telemetry controls, and the event timeline.",
    },
    details: [
      {
        title: "Summary",
        src: "/projects/carla-views/details/explorer-summary.png",
        width: 651,
        height: 234,
        alt: "Run Explorer summary statistics from the recorded saved session.",
      },
      {
        title: "Event Timeline",
        src: "/projects/carla-views/details/explorer-events.png",
        width: 1320,
        height: 208,
        alt: "Visible recorded Event Timeline entries, including N/A simulation timestamps.",
      },
    ],
  },
  {
    id: "comparison",
    label: "Comparison Summary",
    title: "Compare the headline metrics",
    caption: "Compare summary metrics from two saved runs, including speed, duration, and event counts.",
    notice: "The delta is Run B − Run A: a difference, not a performance score.",
    original: {
      src: "/projects/carla-compare.png",
      width: 1381,
      height: 952,
      alt: "Recorded Comparison Summary showing two saved runs and their summary metric differences.",
    },
    details: [
      {
        title: "Summary Delta",
        src: "/projects/carla-views/details/comparison-delta.png",
        width: 1320,
        height: 351,
        alt: "Summary Delta table comparing Run A, Run B, and the Run B minus Run A differences.",
      },
    ],
  },
  {
    id: "telemetry",
    label: "Telemetry Comparison",
    title: "See how the runs differ over time",
    caption: "Overlay speed and control-input traces against elapsed run time.",
    notice: "Chart time is relative to each run’s first valid telemetry timestamp, not replay or event synchronization.",
    original: {
      src: "/projects/carla-views/originals/telemetry-comparison.png",
      width: 1354,
      height: 1100,
      alt: "Recorded Telemetry Comparison with speed and control-input charts for two saved runs.",
    },
    details: [
      {
        title: "Speed Comparison",
        src: "/projects/carla-views/details/speed-comparison.png",
        width: 1320,
        height: 501,
        alt: "Recorded Speed Comparison with both runs’ traces, full elapsed-time axis, units, and legend.",
      },
      {
        title: "Control Inputs Comparison",
        src: "/projects/carla-views/details/control-comparison.png",
        width: 1320,
        height: 551,
        alt: "Recorded Control Inputs Comparison with both runs’ traces, full elapsed-time axis, and legend.",
      },
    ],
  },
] as const satisfies readonly CarlaRecordedView[];

export type CarlaViewId = (typeof carlaViews)[number]["id"];

export function getCarlaView(id?: string): (typeof carlaViews)[number] {
  return carlaViews.find((view) => view.id === id) ?? carlaViews[0];
}
