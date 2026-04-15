import Layout from "../components/Layout";

const financials = [
  {
    year: "2023–24",
    income: "₹4,85,000",
    expenditure: "₹3,90,000",
    surplus: "₹95,000",
  },
];

const utilization = [
  {
    category: "Plantation Programs",
    percent: 45,
    color: "bg-forest-green-700",
  },
  { category: "Soil Conservation", percent: 25, color: "bg-forest-green-500" },
  { category: "Waste Management", percent: 20, color: "bg-light-green" },
  { category: "Admin & Operations", percent: 10, color: "bg-muted-foreground" },
];

export default function Transparency() {
  return (
    <Layout
      pageTitle="Our Commitment to Transparency"
      pageDescription="We believe in full accountability to our donors, communities, and the public."
    >
      {/* Annual Reports */}
      <section
        className="py-16 md:py-20 bg-cream"
        data-ocid="transparency.reports_section"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-8">
            📄 Annual Reports
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div
              className="bg-card rounded-card shadow-card p-6 flex items-center justify-between"
              data-ocid="transparency.report.1"
            >
              <div>
                <p className="font-heading font-bold text-foreground">
                  Annual Report 2023–24
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Full program & financial summary
                </p>
              </div>
              <button
                type="button"
                data-ocid="transparency.download_report_button.1"
                className="flex-shrink-0 bg-forest-green-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-forest-green-900 transition-colors"
              >
                📥 Download PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Summary */}
      <section
        className="py-12 bg-impact-green"
        data-ocid="transparency.financial_section"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-6">
            💰 Financial Summary
          </h2>
          <div className="bg-card rounded-card shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-forest-green-800 text-white">
                    <th className="text-left px-5 py-3 font-semibold">Year</th>
                    <th className="text-right px-5 py-3 font-semibold">
                      Income
                    </th>
                    <th className="text-right px-5 py-3 font-semibold">
                      Expenditure
                    </th>
                    <th className="text-right px-5 py-3 font-semibold">
                      Surplus
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {financials.map((row) => (
                    <tr key={row.year} className="border-b border-border">
                      <td className="px-5 py-3 font-medium">{row.year}</td>
                      <td className="px-5 py-3 text-right text-forest-green-700 font-semibold">
                        {row.income}
                      </td>
                      <td className="px-5 py-3 text-right text-earth-brown font-semibold">
                        {row.expenditure}
                      </td>
                      <td className="px-5 py-3 text-right text-forest-green-900 font-bold">
                        {row.surplus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Utilization */}
      <section
        className="py-12 bg-cream"
        data-ocid="transparency.utilization_section"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-6">
            📊 Fund Utilization
          </h2>
          <div className="bg-card rounded-card shadow-card p-6 space-y-5">
            {utilization.map((item) => (
              <div
                key={item.category}
                data-ocid={`transparency.utilization.${item.category.toLowerCase().replace(/\s+/g, "_")}`}
              >
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-foreground">
                    {item.category}
                  </span>
                  <span className="font-bold text-forest-green-800">
                    {item.percent}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className={`${item.color} h-3 rounded-full transition-all duration-1000`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 80G Details */}
      <section
        className="py-12 bg-impact-green"
        data-ocid="transparency.tax_section"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-6">
            🧾 80G Tax Exemption
          </h2>
          <div className="bg-card rounded-card shadow-card p-6">
            <p className="text-foreground/75 leading-relaxed mb-4">
              Anumaya Sansthan is registered under Section 12A and eligible for
              80G income tax exemption. All donors who contribute are eligible
              to claim a tax deduction on their donations.
            </p>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>✅ Registered under Section 12A of the Income Tax Act</li>
              <li>✅ 80G certificate available upon request</li>
              <li>✅ Donation receipt issued for all contributions</li>
              <li>
                ✅ Email:{" "}
                <a
                  href="mailto:contact@anumayasansthan.org"
                  className="text-forest-green-700 underline"
                >
                  contact@anumayasansthan.org
                </a>{" "}
                for certificates
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Registration Certificate */}
      <section
        className="py-12 bg-cream"
        data-ocid="transparency.registration_section"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-2xl font-bold text-forest-green-900 mb-6">
            📜 Registration Certificate
          </h2>
          <div className="bg-card rounded-card border-2 border-forest-green-300 shadow-card p-8 relative">
            <div className="absolute -top-3 left-6 bg-forest-green-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Government Registered
            </div>
            <div className="text-center mt-2">
              <div className="text-5xl mb-4">🏛️</div>
              <h3 className="font-heading text-2xl font-bold text-forest-green-900">
                Anumaya Sansthan
              </h3>
              <p className="font-hindi text-forest-green-700 text-base mt-1 mb-4">
                माया सामाजिक उत्थान एवं परामर्श संस्थान
              </p>
              <div className="grid grid-cols-2 gap-4 text-left max-w-md mx-auto">
                {[
                  { label: "Registration Number", value: "S000071/23-24" },
                  { label: "Date of Registration", value: "12th June 2023" },
                  { label: "Type", value: "Society / NGO" },
                  { label: "State", value: "Bihar, India" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-forest-green-50 rounded-lg p-3"
                  >
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      {item.label}
                    </p>
                    <p className="font-semibold text-forest-green-900 text-sm">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
