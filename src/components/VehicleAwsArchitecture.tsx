function Connection({ label }: { label: string }) {
  return <div className="vehicle-aws-connection"><svg viewBox="0 0 20 32" width="20" height="32" aria-hidden="true"><path d="M10 1v27m-6-6 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" /></svg><span>{label}</span></div>;
}

export default function VehicleAwsArchitecture() {
  return (
    <section className="vehicle-aws" aria-labelledby="vehicle-aws-title">
      <p className="eyebrow">Backend services &amp; cloud infrastructure</p>
      <h2 id="vehicle-aws-title">AWS &amp; service architecture</h2>
      <p>Configured Amazon EC2 and VPC infrastructure for a car-rental backend using Amazon RDS for MySQL persistence and Amazon Cognito for user management.</p>
      <figure className="vehicle-aws-map" aria-labelledby="vehicle-aws-caption">
        <p className="vehicle-aws-label">Application services and integrations</p>
        <div className="vehicle-aws-gateway">
          <h3>Gateway</h3>
          <p>User and vehicle API proxies</p>
        </div>
        <div className="vehicle-aws-branches">
          <div className="vehicle-aws-branch">
            <Connection label="Gateway → vehicle operations" />
            <div className="vehicle-aws-service"><h3>Vehicle service</h3><p>Vehicle records, validation and user associations.</p></div>
            <Connection label="MySQL persistence" />
            <div className="vehicle-aws-cloud" data-cloud-component="rds"><h3>Amazon RDS</h3><p>MySQL database integration</p></div>
          </div>
          <div className="vehicle-aws-branch">
            <Connection label="Gateway → user operations" />
            <div className="vehicle-aws-service"><h3>User service</h3><p>User creation, lookup and listing.</p></div>
            <Connection label="User management" />
            <div className="vehicle-aws-cloud" data-cloud-component="cognito"><h3>Amazon Cognito</h3><p>User-pool integration</p></div>
          </div>
        </div>
        <div className="vehicle-aws-infrastructure">
          <p className="vehicle-aws-label">Infrastructure I configured</p>
          <div className="vehicle-aws-infra-grid">
            <div className="vehicle-aws-cloud" data-cloud-component="ec2"><h3>Amazon EC2</h3><p>Compute configuration</p></div>
            <div className="vehicle-aws-cloud" data-cloud-component="vpc"><h3>Amazon VPC</h3><p>Network configuration</p></div>
          </div>
        </div>
        <figcaption id="vehicle-aws-caption">Logical component diagram—not a subnet layout or a live cloud capture.</figcaption>
      </figure>
      <p className="notice">The linked repository covers the vehicle-service module. The API walkthrough below records that service against a disposable local database.</p>
    </section>
  );
}
