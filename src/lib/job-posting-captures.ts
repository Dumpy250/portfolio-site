export const jobFrames = {
  employerForm: {
    id: "01-create-employer", title: "Enter a fictional employer", label: "Create an employer",
    caption: "This is the filled form before submission, not confirmation that the employer has been saved.",
    notice: "Alder Creek Software is a fictional employer. The saved Employers view provides the separate result.",
    alt: "Create Employer form filled with the fictional name Alder Creek Software, before submission",
    width: 696, height: 216, minimumWidth: 696,
  },
  employers: {
    id: "02-employers-saved", title: "Inspect saved employers", label: "Saved employers",
    caption: "Both fictional employers were saved through the application's employer form.",
    notice: "Alder Creek Software and Copper Finch Studio are separate employer records available to the job form.",
    alt: "Saved Employers table containing Alder Creek Software and Copper Finch Studio",
    width: 1344, height: 314, minimumWidth: 1200,
  },
  jobForm: {
    id: "03-create-job", title: "Create a job and select its employer", label: "Assign a job",
    caption: "The job form selects the already-saved Alder Creek Software employer for Junior .NET Developer. This is before submission.",
    notice: "The employer dropdown links a job to an existing employer rather than re-entering an employer name.",
    alt: "Create Job form filled for Junior .NET Developer with Alder Creek Software selected as employer",
    width: 1344, height: 301, minimumWidth: 1200,
  },
  jobs: {
    id: "05-jobs-list", title: "The saved Jobs list displays each position alongside its employer", label: "Inspect saved jobs",
    caption: "This later capture contains three fictional jobs across two employers, added during the local demonstration—not by a single form submission.",
    notice: "Junior .NET Developer and QA Automation Developer belong to Alder Creek Software; Gameplay Programmer belongs to Copper Finch Studio.",
    alt: "Jobs table showing three fictional positions and their associated employer names",
    width: 1440, height: 410, minimumWidth: 1200,
  },
  applicants: {
    id: "06-applicants-list", title: "Manage applicant records", label: "Applicants",
    caption: "Sam Rivera and Taylor Morgan demonstrate saved applicant names and email addresses using fictional records.",
    notice: "The Applicants list provides a separate place to maintain applicant records.",
    alt: "Applicants table showing two fictional people and reserved .invalid email addresses",
    width: 1344, height: 314, minimumWidth: 1200,
  },
} as const;

export const jobMainFrames = [jobFrames.employerForm, jobFrames.jobForm, jobFrames.jobs] as const;
export type JobFrame = typeof jobFrames[keyof typeof jobFrames];
export type JobCaptureView = "walkthrough" | "employers" | "applicants";
