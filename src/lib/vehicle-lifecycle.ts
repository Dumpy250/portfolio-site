export type IllustrativeUser = "example-user-a" | "example-user-b";
export type VehicleAction = "associate" | "remove";
type IllustrativeVehicle = {
  status: "AVAILABLE" | "ASSOCIATED";
  owner: IllustrativeUser | null;
  association_date: "illustrative association time" | null;
};
export type VehicleModel = {
  vehicle: IllustrativeVehicle | null;
  feedback: string;
  lastAction: VehicleAction | null;
};

// Only a local explanation of VehicleServiceimp, never an API response object.
export function initialVehicleModel(exists = true): VehicleModel {
  return {
    vehicle: exists ? { status: "AVAILABLE", owner: null, association_date: null } : null,
    feedback: exists
      ? "Illustration only: existing vehicle starts AVAILABLE with no owner or association_date. Choose an action to inspect its guard."
      : "Illustration only: no vehicle found. Both actions require an existing vehicle.",
    lastAction: null,
  };
}

export function transitionVehicle(model: VehicleModel, action: VehicleAction, userId: IllustrativeUser): VehicleModel {
  const vehicle = model.vehicle;
  const feedback = (text: string): VehicleModel => ({ ...model, lastAction: action, feedback: `Illustration only: ${text}` });
  if (!vehicle) return feedback("vehicle must exist before an association can change. Source lookup would throw; no API call was made.");
  if (action === "associate") {
    if (vehicle.status !== "AVAILABLE") return feedback("association requires AVAILABLE. The current association is unchanged.");
    return {
      vehicle: { status: "ASSOCIATED", owner: userId, association_date: "illustrative association time" },
      feedback: "Illustration only: AVAILABLE → ASSOCIATED; owner becomes the selected userId and association_date marks when association occurs. The time shown is symbolic, not a recorded timestamp.",
      lastAction: action,
    };
  }
  if (vehicle.status !== "ASSOCIATED") return feedback("removal requires ASSOCIATED. An AVAILABLE vehicle has no association to remove.");
  if (vehicle.owner !== userId) return feedback("owner must match userId to remove this association. The current association is unchanged.");
  return {
    vehicle: { status: "AVAILABLE", owner: null, association_date: null },
    feedback: "Illustration only: ASSOCIATED → AVAILABLE; owner and association_date are cleared together.",
    lastAction: action,
  };
}
