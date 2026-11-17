import test from "node:test";
import assert from "node:assert/strict";
const base = process.env.PORTFOLIO_TEST_URL || "http://127.0.0.1:3210";
const page = async (path) =>
  (await (await fetch(base + path)).text()).replace(
    /<script\b[^>]*>[\s\S]*?<\/script>/g,
    "",
  );

test("project framing credits the warehouse team and avoids Army-led homepage copy", async () => {
  for (const route of ["/", "/projects", "/projects/pytorch-cnn-gpu"]) {
    const html = await page(route);
    assert.ok(
      html.includes("Team project"),
      route + ": warehouse team context",
    );
    assert.ok(
      !/independent project|independent computer-vision|individual computer-vision experiment/i.test(
        html,
      ),
      route + ": no solo-project label",
    );
  }
  const home = await page("/");
  assert.ok(
    !/Army service|Army veteran|paid (development )?internship/i.test(home),
    "homepage leads with development, not military/pay status",
  );
  const rental = await page("/projects/equipment-reservation-tool");
  assert.ok(rental.includes("Software development internship"));
});

test("public pages retain generic Unity experience and public volunteer work without a branded teaser", async () => {
  const home = await page("/");
  const about = await page("/about");
  for (const html of [home, about]) {
    assert.match(html, /developing a Unity game/);
    assert.match(html, /independently/);
  }
  assert.match(home, /Unity · Lua · Game modding · QA/);
  assert.match(about, /independent Unity development/);
  assert.doesNotMatch(home + about, /coming soon|secret project|id="current-projects"/i);
  assert.equal((home.match(/class="project-card"/g) || []).length, 2);
  assert.ok(home.includes('href="/projects"'));
  assert.equal(((await page("/projects")).match(/class="project-card"/g) || []).length, 5);
  assert.ok(about.includes("Volunteer mod development") && about.includes("Battlefield 3 Reality Mod"));
  assert.ok(home.includes("computer-vision prototypes"));
});

test("About presents volunteer modding, personal interests, and one restrained Army entry", async () => {
  const about = await page("/about");
  assert.ok(
    about.includes("Volunteer mod development"),
    "explicit volunteer role",
  );
  assert.ok(
    about.includes("Battlefield 3 Reality Mod") && about.includes("Lua"),
    "named mod and actual contribution",
  );
  assert.ok(
    about.includes('id="interests"') &&
      about.includes("hiking") &&
      about.includes("dogs"),
    "personal interests section",
  );
  assert.equal(
    (about.match(/U.S. Army/g) || []).length,
    1,
    "one background Army entry, not repeated branding",
  );
  assert.ok(!/paid internship|From Army service/i.test(about));
});

test("focused revision exposes confirmed facts and keeps unresolved migration claims off the catalog", async () => {
  const contact = await page("/contact");
  assert.ok(contact.includes('href="https://www.linkedin.com/in/cameron-basham"'));
  const about = await page("/about");
  assert.ok(about.includes('href="https://github.com/Saber-Studios"'));
  assert.ok(about.includes("Collaborated with a friend"));
  assert.ok(about.includes("FS25 editor") && about.includes("in-game radio"));
  assert.ok(!/final class|linear algebra|azurecast|azuracast/i.test(about));
  const home = await page("/");
  assert.ok(!/Built with|Same curiosity|More than|Not the other way around/.test(home));
  const catalog = await page("/projects");
  assert.ok(!/paid internship|aws-vpc-rds-migration|Car Rental Microservices/i.test(catalog));
  assert.ok(catalog.includes("Car Rental Backend &amp; AWS Infrastructure"));
  const vehicle = await page("/projects/car-rental-microservices");
  assert.ok(vehicle.includes("vehicle-to-user associations"));
  assert.ok(vehicle.includes("05c977857c41073a505584839d8e8028a05145e2"));
  assert.ok(vehicle.includes("Configured Amazon EC2 and VPC infrastructure"));
  assert.ok(vehicle.includes("Amazon RDS") && vehicle.includes("Amazon Cognito"));
  assert.ok(!/\bOAuth2\b|\bJWT\b|\bDocker\b|3 domain services/.test(vehicle));
  const rental = await page("/projects/equipment-reservation-tool");
  assert.ok(rental.includes("student import adds valid records, reports invalid emails and skips existing student IDs on reimport"));
  assert.ok(!/department did not continue/.test(rental));
  assert.ok(about.includes("Expected graduation: December 2026"));
  assert.ok(!/department did not continue/.test(about));
  assert.ok(!/sevella|A useful case study/.test(rental));
  const carla = await page("/projects/carla-observability-toolkit");
  assert.ok(carla.includes("My role") && carla.includes("Result"));
  assert.ok(carla.includes("Application screenshots from v1.0.0") && carla.includes("View original screenshot"));
  assert.ok(carla.includes("Comparison Summary") && carla.includes("Telemetry Comparison"));
  assert.ok(carla.includes("Separate branch from saved files"));
  assert.ok(carla.includes("30 listed cases are not 30 automated integration tests"));
  const archive = await page("/projects/aws-vpc-rds-migration");
  assert.ok(archive.includes("supporting evidence has not been resolved"));
  assert.ok(archive.includes('name="robots" content="noindex, follow"'));
  assert.ok(!/Designed VPC|Migrated schema|Local DB stack migrated/.test(archive));
  assert.ok(!(await page("/sitemap.xml")).includes("aws-vpc-rds-migration"));
});
