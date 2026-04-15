import { Link } from "@tanstack/react-router";
import Layout from "../components/Layout";

export default function RefundPolicy() {
  return (
    <Layout
      pageTitle="Refund Policy"
      pageDescription="Our donation refund policy and process for Anumaya Sansthan."
    >
      <article className="py-16 md:py-24 bg-cream" data-ocid="refund.page">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-card rounded-card shadow-card p-8 md:p-12">
            <p className="text-muted-foreground text-sm mb-8">
              Last updated: June 2024 | Anumaya Sansthan (Reg. S000071/23-24)
            </p>

            <div className="bg-forest-green-50 border border-forest-green-200 rounded-lg p-5 mb-8">
              <p className="text-forest-green-800 font-medium text-sm leading-relaxed">
                📌 <strong>Summary:</strong> Donations to Anumaya Sansthan are
                generally non-refundable. However, in case of technical
                double-charges, we process full refunds within 7 working days.
              </p>
            </div>

            <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-4">
              1. General Policy
            </h2>
            <p className="text-foreground/75 leading-relaxed mb-6">
              All donations made to Anumaya Sansthan are voluntary contributions
              to our mission. Once a donation is made and acknowledged, it is
              generally non-refundable, as funds are immediately allocated to
              ongoing programs and initiatives.
            </p>

            <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-4">
              2. Exceptions — Eligible for Refund
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground/75 mb-6">
              <li>
                <strong>Technical double-charge:</strong> If your payment was
                processed twice due to a technical error, you are eligible for a
                full refund of the duplicate charge within 7 working days.
              </li>
              <li>
                <strong>Unauthorized transaction:</strong> If a donation was
                made without your knowledge or authorization, please contact us
                immediately.
              </li>
            </ul>

            <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-4">
              3. Refund Process
            </h2>
            <p className="text-foreground/75 leading-relaxed mb-3">
              To request a refund:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-foreground/75 mb-6">
              <li>
                Email us at{" "}
                <a
                  href="mailto:contact@anumayasansthan.org"
                  className="text-forest-green-700 underline"
                >
                  contact@anumayasansthan.org
                </a>
              </li>
              <li>
                Include your full name, donation receipt number, and reason for
                refund
              </li>
              <li>Our team will review and respond within 2 business days</li>
              <li>
                Approved refunds will be processed to your original payment
                method
              </li>
            </ol>

            <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-4">
              4. Refund Timeline
            </h2>
            <p className="text-foreground/75 leading-relaxed mb-6">
              Approved refunds are processed within{" "}
              <strong>5–10 business days</strong> from the date of approval,
              depending on your bank or payment provider.
            </p>

            <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-4">
              5. Campaign-Specific Donations
            </h2>
            <p className="text-foreground/75 leading-relaxed mb-6">
              Donations made to specific campaigns (e.g., Plant 1000 Trees, Save
              Soil Program) are utilized as stated in the campaign description.
              In the rare event a campaign is discontinued, funds will be
              redirected to the closest aligned program.
            </p>

            <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-4">
              6. Contact Us
            </h2>
            <p className="text-foreground/75 leading-relaxed">
              For any refund queries, reach out to us at:
              <br />📧{" "}
              <a
                href="mailto:contact@anumayasansthan.org"
                className="text-forest-green-700 underline"
              >
                contact@anumayasansthan.org
              </a>
              <br />📍 Anumaya Sansthan, Patna, Bihar, India
              <br />🕐 Response time: 1–2 business days
            </p>

            <div className="mt-8 pt-6 border-t border-border flex gap-4">
              <Link
                to="/donate"
                data-ocid="refund.donate_link"
                className="text-forest-green-700 text-sm font-semibold hover:text-forest-green-900 transition-colors"
              >
                ← Back to Donate
              </Link>
              <Link
                to="/contact"
                data-ocid="refund.contact_link"
                className="text-forest-green-700 text-sm font-semibold hover:text-forest-green-900 transition-colors"
              >
                Contact Us →
              </Link>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}
