import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Elohi privacy policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <main className="pt-24">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl prose prose-invert prose-sm">
          <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
          <p className="text-muted-foreground mt-2">
            Last updated: February 2026
          </p>

          <div className="mt-8 space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground">
                Information We Collect
              </h2>
              <p>
                We collect information you provide directly, including your name,
                email address, company name, job role, and any messages you send
                through our contact form. When you complete our readiness quiz, we
                collect your responses and the resulting assessment data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                How We Use Your Information
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>To provide personalized readiness assessments</li>
                <li>To respond to your inquiries and contact form submissions</li>
                <li>To send relevant information about our services</li>
                <li>To improve our website and services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                Data Storage & Security
              </h2>
              <p>
                Your data is stored securely using industry-standard encryption and
                security practices. We use Supabase for data storage, which
                provides enterprise-grade security including encryption at rest and
                in transit.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                Third-Party Services
              </h2>
              <p>
                We may use third-party services for email delivery (Resend), CRM
                (HubSpot), and analytics. These services have their own privacy
                policies governing the use of your information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                Your Rights
              </h2>
              <p>
                You have the right to access, correct, or delete your personal
                data at any time. You can opt out of marketing communications by
                contacting us directly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                Cookies
              </h2>
              <p>
                We use minimal cookies necessary for site functionality. We do not
                use third-party tracking cookies unless you explicitly consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                Contact Us
              </h2>
              <p>
                If you have any questions about this privacy policy or your data,
                please contact us at{" "}
                <a
                  href="mailto:hello@elohi.us"
                  className="text-primary hover:underline"
                >
                  hello@elohi.us
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
