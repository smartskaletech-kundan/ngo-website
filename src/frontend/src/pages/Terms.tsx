import Layout from "../components/Layout";
import SEO from "../components/SEO";

export default function Terms() {
  return (
    <Layout
      pageTitle="Terms & Conditions"
      pageDescription="Terms governing the use of MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN's website and services."
    >
      <SEO
        title="Terms of Service"
        description="Terms of service for MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN's website. Please read before using our site or services."
      />
      <article className="py-16 md:py-24 bg-cream" data-ocid="terms.page">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-card rounded-card shadow-card p-8 md:p-12">
            <p className="text-muted-foreground text-sm mb-8">
              Last updated: June 2024 | MAYA SAMAJIK UTTHAN EVAM PARAMARSH
              SANSTHAN (Reg. S000071/23-24)
            </p>

            <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-foreground/75 leading-relaxed mb-6">
              By accessing or using the MAYA SAMAJIK UTTHAN EVAM PARAMARSH
              SANSTHAN website, you agree to be bound by these Terms and
              Conditions. If you do not agree with any part of these terms,
              please do not use our website.
            </p>

            <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-4">
              2. Use of Website
            </h2>
            <p className="text-foreground/75 leading-relaxed mb-3">
              You agree to use this website only for lawful purposes and in ways
              that do not infringe the rights of others. You must not:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-foreground/75 mb-6">
              <li>Submit false or misleading information in any form</li>
              <li>Attempt to hack, disrupt, or compromise the website</li>
              <li>
                Use the website for any commercial purpose without prior written
                consent
              </li>
              <li>
                Copy or reproduce content without attribution and permission
              </li>
            </ul>

            <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-4">
              3. Donation Terms
            </h2>
            <p className="text-foreground/75 leading-relaxed mb-6">
              All donations made through this website are voluntary
              contributions to MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN's
              programs. Donations are used for the stated purposes. Receipts are
              issued for all donations. Donations above ₹500 are eligible for
              80G tax deduction, subject to applicable laws.
            </p>

            <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-4">
              4. Intellectual Property
            </h2>
            <p className="text-foreground/75 leading-relaxed mb-6">
              All content on this website — including text, images, logos,
              graphics, and program descriptions — is the intellectual property
              of MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN unless otherwise
              credited. Unauthorized reproduction is prohibited.
            </p>

            <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-4">
              5. Disclaimer of Warranties
            </h2>
            <p className="text-foreground/75 leading-relaxed mb-6">
              This website is provided on an "as-is" basis. MAYA SAMAJIK UTTHAN
              EVAM PARAMARSH SANSTHAN makes no warranties, expressed or implied,
              regarding the accuracy, completeness, or availability of
              information on this site.
            </p>

            <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-4">
              6. Limitation of Liability
            </h2>
            <p className="text-foreground/75 leading-relaxed mb-6">
              MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN shall not be liable
              for any indirect, incidental, or consequential damages arising
              from the use of this website or reliance on its content.
            </p>

            <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-4">
              7. Governing Law
            </h2>
            <p className="text-foreground/75 leading-relaxed mb-6">
              These terms are governed by the Laws of India. Any disputes shall
              be subject to the jurisdiction of courts in Patna, Bihar, India.
            </p>

            <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-4">
              8. Changes to Terms
            </h2>
            <p className="text-foreground/75 leading-relaxed">
              We reserve the right to update these Terms at any time. Continued
              use of the website constitutes acceptance of the revised terms.
              For queries, contact{" "}
              <a
                href="mailto:nirmalkumarsingh9625@gmail.com"
                className="text-forest-green-700 underline"
              >
                nirmalkumarsingh9625@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </article>
    </Layout>
  );
}
