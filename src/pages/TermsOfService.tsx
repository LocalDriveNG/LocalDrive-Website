import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";

const sections: LegalSection[] = [
  { id: "introduction", title: "Introduction", level: 1 },
  { id: "interpretation", title: "Interpretation", level: 1 },
  { id: "services", title: "Our Services", level: 1 },
  { id: "privacy", title: "Privacy Policy", level: 1 },
  { id: "age-restriction", title: "Age Restriction", level: 1 },
  { id: "license", title: "License to Use Our Platform", level: 1 },
  { id: "who-may-use", title: "Who May Use Our Services", level: 1 },
  { id: "bookings-payments", title: "Bookings, Payments & Refunds", level: 1 },
  { id: "prohibited", title: "Prohibited Activities", level: 1 },
  { id: "intellectual-property", title: "Intellectual Property", level: 1 },
  { id: "amendments", title: "Amendments to Terms", level: 1 },
  { id: "account-security", title: "Account Security", level: 1 },
  { id: "service-availability", title: "Service Availability", level: 1 },
  { id: "termination", title: "Termination", level: 1 },
  { id: "liability", title: "Limitation of Liability", level: 1 },
  { id: "indemnification", title: "Indemnification", level: 1 },
  { id: "dispute-resolution", title: "Dispute Resolution", level: 1 },
  { id: "force-majeure", title: "Force Majeure", level: 1 },
];

const TermsOfService = () => {
  return (
    <LegalPageLayout
      title="Terms of Service"
      lastUpdated="25 September 2025"
      sections={sections}
    >
      <section id="introduction">
        <p>Welcome to LocalDrive ("we," "us," "our").</p>
        <p>
          These Terms and Conditions ("Terms") govern your access to and use of the LocalDrive website, applications, and related services, including all pages and platforms under{" "}
          <a href="https://www.localdriveapp.com" className="text-primary hover:text-primary-hover font-medium">
            www.localdriveapp.com
          </a>{" "}
          (collectively, the "Platform").
        </p>
        <p>
          By using our Platform, you expressly and fully accept all Terms contained herein. If you disagree with any part of these Terms, you must not use the Platform.
        </p>
        <p className="font-semibold">PLEASE READ AND UNDERSTAND THESE TERMS OF USE CAREFULLY BEFORE PROCEEDING.</p>
      </section>

      <section id="interpretation">
        <h2>Interpretation</h2>
        <p>The following definitions apply:</p>
        <ul>
          <li><strong>Agreement / Terms of Use</strong> – means these Terms and Conditions.</li>
          <li><strong>Data Protection Legislation</strong> – refers to the Nigeria Data Protection Act 2023 (NDPA) and other applicable laws and regulations.</li>
          <li><strong>Effective Date</strong> – the date of your first use of and/or access to the Services.</li>
          <li><strong>Services</strong> – LocalDrive's platform and offerings, including booking driving instructors, managing lesson packages, progress tracking, driver's license processing, and related support features.</li>
          <li><strong>Personal Data</strong> – has the meaning defined in the NDPA.</li>
          <li><strong>Documentation</strong> – all materials, guides, and resources provided by LocalDrive through its website, app, or other means.</li>
        </ul>
      </section>

      <section id="services">
        <h2>Our Services</h2>
        <p>LocalDrive provides technology-driven solutions that connect learners with verified driving instructors in their local area. Our services include:</p>
        <ul>
          <li>Booking and scheduling driving lessons in packages (not individual lessons).</li>
          <li>Progress tracking and reporting of lessons completed.</li>
          <li>Secure payment processing for packages.</li>
          <li>Optional license processing services for learners who have completed their lessons.</li>
          <li>Customer support and communication tools between learners and instructors.</li>
        </ul>
        <p>We strive to maintain the highest standards of safety, transparency, and professionalism in delivering our services.</p>
      </section>

      <section id="privacy">
        <h2>Privacy Policy</h2>
        <p>
          By using LocalDrive, you consent to the collection, storage, and use of your information as described in our Privacy Policy. You also agree that any data you provide is accurate and lawful.
        </p>
      </section>

      <section id="age-restriction">
        <h2>Age Restriction</h2>
        <p>You must be at least 18 years old to use LocalDrive Services.</p>
      </section>

      <section id="license">
        <h2>License to Use Our Platform</h2>
        <p>
          We grant you a non-exclusive, revocable license to use the Platform in accordance with these Terms. You may not reproduce, modify, reverse engineer, or use LocalDrive's intellectual property without authorization.
        </p>
      </section>

      <section id="who-may-use">
        <h2>Who May Use Our Services</h2>
        <ul>
          <li>You must have the legal capacity to enter a binding agreement.</li>
          <li>If using the Services on behalf of a company or third party, you confirm you are authorized to do so.</li>
        </ul>
      </section>

      <section id="bookings-payments">
        <h2>Booking, Payments, Cancellations & Refunds</h2>
        
        <h3>Payment Model</h3>
        <ul>
          <li><strong>Packages:</strong> Lessons are purchased in packages, each containing a set number of lessons within a specified time frame.</li>
          <li><strong>Scheduling:</strong> Lessons must be scheduled through the Platform. You can only schedule the next lesson once the previous one has been marked as completed by the instructor.</li>
          <li>Payments are upfront and non-transferable, subject to the policies below.</li>
        </ul>

        <h3>Cancellation & Refund Policy</h3>
        <h4>Before Training Starts</h4>
        <ul>
          <li>Full refund if canceled ≥ 7 days before package start date.</li>
          <li>50% refund if canceled 3–6 days before package start date.</li>
          <li>No refund if canceled &lt; 72 hours before package start date.</li>
        </ul>

        <h4>After Training Has Started</h4>
        <ul>
          <li>Refunds are pro-rated by remaining unused lessons, minus a 10% administrative fee.</li>
          <li>If a user completes ≥ 50% of package, no refund applies.</li>
        </ul>

        <h3>Lesson Rescheduling & Cancellation</h3>
        <ul>
          <li>Users can reschedule lessons within their package duration.</li>
          <li>Free reschedule if done ≥ 24 hours before lesson starts.</li>
          <li>
            Late cancellation (&lt; 24 hours' notice):
            <ul>
              <li>User is notified that cancellation attracts a late cancellation charge.</li>
              <li>Lesson is not refunded but the package validity period is extended by the duration of the canceled lesson.</li>
              <li>User pays the late cancellation charge (flat fee).</li>
            </ul>
          </li>
        </ul>

        <h3>Instructor Extensions</h3>
        <ul>
          <li>Within package timeframe → Instructor may extend without extra charge.</li>
          <li>Beyond package timeframe → User must purchase add-on lessons or pay an extension fee.</li>
        </ul>

        <h3>Package Expiration</h3>
        <ul>
          <li>Each package has a validity period (e.g., 4 weeks for 8 lessons).</li>
          <li>
            If learner does not finish within this period:
            <ul>
              <li>Remaining lessons are forfeited.</li>
              <li>Option: Pay an extension fee (e.g., 20% of package cost) to extend validity by 1–2 weeks.</li>
            </ul>
          </li>
        </ul>

        <h3>Charges & Penalties</h3>
        <ul>
          <li>Admin fee (10%) for processing partial refunds.</li>
          <li>Late cancellation charge = flat fee + package validity extended.</li>
          <li>Extension fee for expired packages (optional add-on).</li>
        </ul>
      </section>

      <section id="prohibited">
        <h2>Prohibited Activities</h2>
        <ul>
          <li>Use the Platform for fraudulent, unlawful, or abusive purposes.</li>
          <li>Impersonate another user, falsify information, or misuse instructor/learner identities.</li>
          <li>Circumvent booking/payment processes by transacting outside the Platform.</li>
          <li>Interfere with or attempt to exploit the Platform's systems or users.</li>
        </ul>
      </section>

      <section id="intellectual-property">
        <h2>Intellectual Property</h2>
        <p>
          All rights to LocalDrive's brand, logo, app, website, and content remain our exclusive property. You may not use our name, trademarks, or materials without written consent.
        </p>
      </section>

      <section id="amendments">
        <h2>Amendments to Terms</h2>
        <p>
          We may revise these Terms at any time. Updates will be published on this page. By continuing to use LocalDrive after changes, you accept the revised Terms.
        </p>
      </section>

      <section id="account-security">
        <h2>Account Security</h2>
        <p>
          You are responsible for safeguarding your account credentials. Report any unauthorized access immediately to{" "}
          <a href="mailto:support@localdriveapp.com" className="text-primary hover:text-primary-hover font-medium">
            support@localdriveapp.com
          </a>.
        </p>
      </section>

      <section id="service-availability">
        <h2>Service Availability</h2>
        <p>
          We aim for continuous service but may conduct maintenance or updates. We are not liable for interruptions beyond our control.
        </p>
      </section>

      <section id="termination">
        <h2>Termination</h2>
        <p>LocalDrive may suspend or terminate your account if you:</p>
        <ul>
          <li>Breach these Terms.</li>
          <li>Engage in fraud, illegal activity, or misuse of the Platform.</li>
          <li>Fail to comply with security or verification requirements.</li>
        </ul>
        <p>You may close your account at any time, subject to completion of pending transactions.</p>
      </section>

      <section id="liability">
        <h2>Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, LocalDrive shall not be liable for any indirect, incidental, or consequential damages arising from use of our Platform.
        </p>
      </section>

      <section id="indemnification">
        <h2>Indemnification</h2>
        <p>
          You agree to indemnify and hold LocalDrive harmless from any claims, damages, or costs resulting from your misuse of the Services or violation of these Terms.
        </p>
      </section>

      <section id="dispute-resolution">
        <h2>Dispute Resolution</h2>
        <ul>
          <li><strong>Negotiation & Mediation:</strong> Parties will attempt to resolve disputes in good faith within 14 days. If unresolved, disputes shall be referred to mediation under the Lagos Multi-Door Courthouse (LMDC) rules.</li>
          <li><strong>Arbitration:</strong> If mediation fails, disputes may be referred to arbitration in Nigeria, conducted in English under applicable laws.</li>
          <li><strong>Jurisdiction:</strong> These Terms are governed by the laws of the Federal Republic of Nigeria.</li>
        </ul>
      </section>

      <section id="force-majeure">
        <h2>Force Majeure</h2>
        <p>
          LocalDrive is not liable for delays or failures caused by events beyond its control (e.g., natural disasters, government actions, internet outages).
        </p>
      </section>

      <div className="mt-8 p-4 bg-primary/5 border-l-4 border-primary rounded">
        <p className="font-semibold text-foreground">
          🔹 Motto: "Your Journey to Confident Driving Starts Here 🚗 Learn, Book, Drive Smarter."
        </p>
      </div>
    </LegalPageLayout>
  );
};

export default TermsOfService;
