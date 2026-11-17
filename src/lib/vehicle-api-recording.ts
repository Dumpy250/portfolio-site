// Mechanically copied from the hash-verified fictional HTTP recording. No live API calls.
export type RecordedReceipt = {
  index: number;
  label: string;
  started_utc: string;
  finished_utc: string;
  request: { method: string; url: string; body: string | null };
  response: { status: number; body: string; content_type: string | null };
  expected_status: number;
};
export const vehicleRecording: readonly RecordedReceipt[] = [
  {
    "index": 1,
    "label": "initial-list",
    "started_utc": "2026-11-16T04:15:27.731687+00:00",
    "finished_utc": "2026-11-16T04:15:27.960027+00:00",
    "request": {
      "method": "GET",
      "url": "http://127.0.0.1:51872/vehicles",
      "body": null
    },
    "response": {
      "status": 200,
      "body": "[]",
      "content_type": "application/json"
    },
    "expected_status": 200
  },
  {
    "index": 2,
    "label": "blank-licence-create",
    "started_utc": "2026-11-16T04:15:27.961153+00:00",
    "finished_utc": "2026-11-16T04:15:28.061023+00:00",
    "request": {
      "method": "POST",
      "url": "http://127.0.0.1:51872/vehicles",
      "body": "{\"brand\":\"Fictional Motors\",\"model\":\"Demo Compact\",\"licence_number\":\"\"}"
    },
    "response": {
      "status": 400,
      "body": "{\"code\":400,\"message\":\"You must define the licence plate number\"}",
      "content_type": "application/json"
    },
    "expected_status": 400
  },
  {
    "index": 3,
    "label": "valid-create",
    "started_utc": "2026-11-16T04:15:28.096514+00:00",
    "finished_utc": "2026-11-16T04:15:28.151007+00:00",
    "request": {
      "method": "POST",
      "url": "http://127.0.0.1:51872/vehicles",
      "body": "{\"brand\":\"Fictional Motors\",\"model\":\"Demo Compact\",\"licence_number\":\"DEMO-001\"}"
    },
    "response": {
      "status": 200,
      "body": "{\"id\":\"1a7f0fc1-76b9-42be-9177-48ab933dcf03\",\"status\":\"AVAILABLE\",\"model\":\"Demo Compact\",\"brand\":\"Fictional Motors\",\"licence_number\":\"DEMO-001\"}",
      "content_type": "application/json"
    },
    "expected_status": 200
  },
  {
    "index": 4,
    "label": "created-read",
    "started_utc": "2026-11-16T04:15:28.184485+00:00",
    "finished_utc": "2026-11-16T04:15:28.197356+00:00",
    "request": {
      "method": "GET",
      "url": "http://127.0.0.1:51872/vehicles/1a7f0fc1-76b9-42be-9177-48ab933dcf03",
      "body": null
    },
    "response": {
      "status": 200,
      "body": "{\"id\":\"1a7f0fc1-76b9-42be-9177-48ab933dcf03\",\"status\":\"AVAILABLE\",\"model\":\"Demo Compact\",\"brand\":\"Fictional Motors\",\"licence_number\":\"DEMO-001\"}",
      "content_type": "application/json"
    },
    "expected_status": 200
  },
  {
    "index": 5,
    "label": "created-list",
    "started_utc": "2026-11-16T04:15:28.198341+00:00",
    "finished_utc": "2026-11-16T04:15:28.205818+00:00",
    "request": {
      "method": "GET",
      "url": "http://127.0.0.1:51872/vehicles",
      "body": null
    },
    "response": {
      "status": 200,
      "body": "[{\"id\":\"1a7f0fc1-76b9-42be-9177-48ab933dcf03\",\"status\":\"AVAILABLE\",\"model\":\"Demo Compact\",\"brand\":\"Fictional Motors\",\"licence_number\":\"DEMO-001\"}]",
      "content_type": "application/json"
    },
    "expected_status": 200
  },
  {
    "index": 6,
    "label": "associate",
    "started_utc": "2026-11-16T04:15:28.206901+00:00",
    "finished_utc": "2026-11-16T04:15:28.236123+00:00",
    "request": {
      "method": "POST",
      "url": "http://127.0.0.1:51872/vehicles/1a7f0fc1-76b9-42be-9177-48ab933dcf03/user/demo-user-001",
      "body": null
    },
    "response": {
      "status": 201,
      "body": "",
      "content_type": null
    },
    "expected_status": 201
  },
  {
    "index": 7,
    "label": "associated-read",
    "started_utc": "2026-11-16T04:15:28.237595+00:00",
    "finished_utc": "2026-11-16T04:15:28.245840+00:00",
    "request": {
      "method": "GET",
      "url": "http://127.0.0.1:51872/vehicles/1a7f0fc1-76b9-42be-9177-48ab933dcf03",
      "body": null
    },
    "response": {
      "status": 200,
      "body": "{\"id\":\"1a7f0fc1-76b9-42be-9177-48ab933dcf03\",\"status\":\"ASSOCIATED\",\"owner\":\"demo-user-001\",\"model\":\"Demo Compact\",\"brand\":\"Fictional Motors\",\"licence_number\":\"DEMO-001\",\"association_date\":\"2026-11-16T04:15:28.211+00:00\"}",
      "content_type": "application/json"
    },
    "expected_status": 200
  },
  {
    "index": 8,
    "label": "repeat-associate",
    "started_utc": "2026-11-16T04:15:28.278721+00:00",
    "finished_utc": "2026-11-16T04:15:28.284121+00:00",
    "request": {
      "method": "POST",
      "url": "http://127.0.0.1:51872/vehicles/1a7f0fc1-76b9-42be-9177-48ab933dcf03/user/demo-user-001",
      "body": null
    },
    "response": {
      "status": 404,
      "body": "{\"code\":404,\"message\":\"Not Found\"}",
      "content_type": "application/json"
    },
    "expected_status": 404
  },
  {
    "index": 9,
    "label": "after-repeat-read",
    "started_utc": "2026-11-16T04:15:28.317799+00:00",
    "finished_utc": "2026-11-16T04:15:28.324725+00:00",
    "request": {
      "method": "GET",
      "url": "http://127.0.0.1:51872/vehicles/1a7f0fc1-76b9-42be-9177-48ab933dcf03",
      "body": null
    },
    "response": {
      "status": 200,
      "body": "{\"id\":\"1a7f0fc1-76b9-42be-9177-48ab933dcf03\",\"status\":\"ASSOCIATED\",\"owner\":\"demo-user-001\",\"model\":\"Demo Compact\",\"brand\":\"Fictional Motors\",\"licence_number\":\"DEMO-001\",\"association_date\":\"2026-11-16T04:15:28.211+00:00\"}",
      "content_type": "application/json"
    },
    "expected_status": 200
  },
  {
    "index": 10,
    "label": "wrong-owner-release",
    "started_utc": "2026-11-16T04:15:28.325993+00:00",
    "finished_utc": "2026-11-16T04:15:28.332850+00:00",
    "request": {
      "method": "DELETE",
      "url": "http://127.0.0.1:51872/vehicles/1a7f0fc1-76b9-42be-9177-48ab933dcf03/user/demo-user-002",
      "body": null
    },
    "response": {
      "status": 404,
      "body": "{\"code\":404,\"message\":\"Not Found\"}",
      "content_type": "application/json"
    },
    "expected_status": 404
  },
  {
    "index": 11,
    "label": "after-wrong-owner-read",
    "started_utc": "2026-11-16T04:15:28.366379+00:00",
    "finished_utc": "2026-11-16T04:15:28.372416+00:00",
    "request": {
      "method": "GET",
      "url": "http://127.0.0.1:51872/vehicles/1a7f0fc1-76b9-42be-9177-48ab933dcf03",
      "body": null
    },
    "response": {
      "status": 200,
      "body": "{\"id\":\"1a7f0fc1-76b9-42be-9177-48ab933dcf03\",\"status\":\"ASSOCIATED\",\"owner\":\"demo-user-001\",\"model\":\"Demo Compact\",\"brand\":\"Fictional Motors\",\"licence_number\":\"DEMO-001\",\"association_date\":\"2026-11-16T04:15:28.211+00:00\"}",
      "content_type": "application/json"
    },
    "expected_status": 200
  },
  {
    "index": 12,
    "label": "matching-owner-release",
    "started_utc": "2026-11-16T04:15:28.373736+00:00",
    "finished_utc": "2026-11-16T04:15:28.384344+00:00",
    "request": {
      "method": "DELETE",
      "url": "http://127.0.0.1:51872/vehicles/1a7f0fc1-76b9-42be-9177-48ab933dcf03/user/demo-user-001",
      "body": null
    },
    "response": {
      "status": 200,
      "body": "",
      "content_type": null
    },
    "expected_status": 200
  },
  {
    "index": 13,
    "label": "released-read",
    "started_utc": "2026-11-16T04:15:28.385526+00:00",
    "finished_utc": "2026-11-16T04:15:28.391931+00:00",
    "request": {
      "method": "GET",
      "url": "http://127.0.0.1:51872/vehicles/1a7f0fc1-76b9-42be-9177-48ab933dcf03",
      "body": null
    },
    "response": {
      "status": 200,
      "body": "{\"id\":\"1a7f0fc1-76b9-42be-9177-48ab933dcf03\",\"status\":\"AVAILABLE\",\"model\":\"Demo Compact\",\"brand\":\"Fictional Motors\",\"licence_number\":\"DEMO-001\"}",
      "content_type": "application/json"
    },
    "expected_status": 200
  },
  {
    "index": 14,
    "label": "final-list",
    "started_utc": "2026-11-16T04:15:28.426471+00:00",
    "finished_utc": "2026-11-16T04:15:28.432237+00:00",
    "request": {
      "method": "GET",
      "url": "http://127.0.0.1:51872/vehicles",
      "body": null
    },
    "response": {
      "status": 200,
      "body": "[{\"id\":\"1a7f0fc1-76b9-42be-9177-48ab933dcf03\",\"status\":\"AVAILABLE\",\"model\":\"Demo Compact\",\"brand\":\"Fictional Motors\",\"licence_number\":\"DEMO-001\"}]",
      "content_type": "application/json"
    },
    "expected_status": 200
  }
];

function receipt(label: string): RecordedReceipt {
  const found = vehicleRecording.find((row) => row.label === label);
  if (!found) throw new Error(`Missing recorded vehicle receipt: ${label}`);
  return found;
}
export type VehicleStepId = "create" | "associate" | "release";
export type VehicleEvidenceView = {
  id: string;
  label: string;
  title: string;
  note: string;
  action: RecordedReceipt;
  saved?: RecordedReceipt;
};
export const vehicleSteps: readonly VehicleEvidenceView[] = [
  { id: "create", label: "Create", title: "Vehicle registered and available", note: "The service validates the fictional vehicle, assigns its UUID and saves an AVAILABLE record.", action: receipt("valid-create"), saved: receipt("created-read") },
  { id: "associate", label: "Associate", title: "Vehicle associated with a user", note: "Association saves demo-user-001 and the association timestamp. The following GET shows the persisted state.", action: receipt("associate"), saved: receipt("associated-read") },
  { id: "release", label: "Release", title: "Vehicle released and available again", note: "Matching-owner release clears the association and restores AVAILABLE. The following GET omits owner and association_date.", action: receipt("matching-owner-release"), saved: receipt("released-read") },
];
export const vehicleGuards: readonly VehicleEvidenceView[] = [
  { id: "blank-licence", label: "Blank licence", title: "Blank licence rejected", note: "A blank licence number is rejected before persistence. The database remained empty after this request.", action: receipt("blank-licence-create") },
  { id: "repeat-association", label: "Repeated association", title: "Existing association preserved", note: "A second association is rejected. The following GET retains the original owner and timestamp.", action: receipt("repeat-associate"), saved: receipt("after-repeat-read") },
  { id: "wrong-owner", label: "Wrong-owner release", title: "Association preserved for a different user identifier", note: "A different user identifier cannot release this association. The following GET shows the unchanged association.", action: receipt("wrong-owner-release"), saved: receipt("after-wrong-owner-read") },
];
export const originalVehicleRecords = "/projects/vehicle-service-recording/requests.json";
export function recordedPath(record: RecordedReceipt): string {
  return record.request.url.replace(/^https?:\/\/[^/]+/, "");
}
export function formattedBody(body: string): string {
  if (body === "") return "";
  return JSON.stringify(JSON.parse(body), null, 2);
}
