import Layout from "../components/Layout";
import SEO from "../components/SEO";

export default function PrivacyPolicy() {
  return (
    <Layout
      pageTitle="Privacy Policy"
      pageDescription="How MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN collects, uses, and protects your information."
    >
      <SEO
        title="Privacy Policy"
        description="Privacy policy of MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN — how we collect, use, and protect your personal information."
      />
      <article className="py-16 md:py-24 bg-cream" data-ocid="privacy.page">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-sm md:prose-base max-w-none">
          <div className="bg-card rounded-card shadow-card p-8 md:p-12">
            <p className="text-muted-foreground text-sm mb-8">
              Last updated: June 2024 | MAYA SAMAJIK UTTHAN EVAM PARAMARSH
              SANSTHAN (Reg. S000071/23-24)
            </p>

            <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-foreground/75 leading-relaxed mb-3">
              We collect information you provide when you donate, volunteer, or
              contact us:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-foreground/75 mb-6">
              <li>Full name, email address, and phone number</li>
              <li>Postal address (for donation receipts)</li>
              <li>PAN number (voluntarily, for 80G tax benefit)</li>
              <li>Message content when you contact us</li>
              <li>
                Donation amount, campaign preference, and transaction data
              </li>
            </ul>

            <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-4">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-1 text-foreground/75 mb-6">
              <li>Issuing donation receipts and 80G tax certificates</li>
              <li>Sending program updates and impact reports (with consent)</li>
              <li>Processing and acknowledging volunteer applications</li>
              <li>Responding to your queries</li>
              <li>Complying with legal and regulatory obligations</li>
            </ul>

            <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-4">
              3. Data Sharing
            </h2>
            <p className="text-foreground/75 leading-relaxed mb-6">
              We do not sell, rent, or trade your personal information to third
              parties. Data may be shared only with payment processors for
              transaction security, or as required by law.
            </p>

            <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-4">
              4. Data Security
            </h2>
            <p className="text-foreground/75 leading-relaxed mb-6">
              We use SSL encryption and follow secure data storage practices to
              protect your personal information. Access is restricted to
              authorized personnel only.
            </p>

            <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-4">
              5. Your Rights
            </h2>
            <p className="text-foreground/75 leading-relaxed mb-6">
              You may request access to, correction of, or deletion of your
              personal data at any time. To exercise these rights, contact us at{" "}
              <a
                href="mailto:nirmalkumarsingh9625@gmail.com"
                className="text-forest-green-700 underline"
              >
                nirmalkumarsingh9625@gmail.com
              </a>
              .
            </p>

            <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-4">
              6. Cookies
            </h2>
            <p className="text-foreground/75 leading-relaxed mb-6">
              Our website uses minimal cookies for functionality. No tracking or
              advertising cookies are used.
            </p>

            <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-4">
              7. Contact for Privacy Queries
            </h2>
            <p className="text-foreground/75 leading-relaxed">
              MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN, ANUPURI, VEER BASAWAN
              SINGH NAGAR, NEAR PATLIPUTRA RAILWAY STATION, B.V. College,
              Phulwari, Patna-800014, Bihar, India
              <br />
              Email:{" "}
              <a
                href="mailto:nirmalkumarsingh9625@gmail.com"
                className="text-forest-green-700 underline"
              >
                nirmalkumarsingh9625@gmail.com
              </a>
            </p>
          </div>
        </div>
      </article>
    </Layout>
  );
}
