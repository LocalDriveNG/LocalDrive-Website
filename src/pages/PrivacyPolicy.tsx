import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";
import { Link } from "react-router-dom";

const sections: LegalSection[] = [
  { id: "overview", title: "Overview", level: 1 },
  { id: "definitions", title: "Definitions", level: 1 },
  { id: "privacy-principles", title: "Privacy Principles", level: 1 },
  { id: "personal-information", title: "Personal Information We Collect", level: 1 },
  { id: "how-we-get-info", title: "How We Get Your Information", level: 1 },
  { id: "lawful-basis", title: "Lawful Basis for Processing", level: 1 },
  { id: "how-we-use", title: "How We Use Your Information", level: 1 },
  { id: "data-security", title: "Data Security and Retention", level: 1 },
  { id: "cookies", title: "Cookies", level: 1 },
  { id: "updates", title: "Updates to This Notice", level: 1 },
];

const PrivacyPolicy = () => {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="September 2025"
      sections={sections}
    >
      <section id="overview">
        <p>
          We are LocalDrive Technologies LTD, a Nigerian private limited company, located in Lagos, Nigeria. LocalDrive is a mobility technology company that connects driving learners with certified instructors, enabling safe, reliable, and transparent access to driving lessons. We also provide digital solutions for booking, tracking progress, and optional licensing services for learners.
        </p>
        <p>
          At LocalDrive and its affiliates (collectively referred to as "LocalDrive"), we greatly value the trust you place in us by sharing your information. Protecting your privacy is a top priority. This Privacy Notice explains what Personal Information we collect, why we collect it, and how we use it.
        </p>

        <h1 id="overview">Overview</h1>
        <p>
          This Privacy Notice describes your privacy rights regarding why, how, and when we collect, use, store, share, and protect your information across our website, booking and payment platforms ("Platforms"), APIs, software applications ("Apps"), email notifications, and tools regardless of how you use or access them.
        </p>
        <p>
          This Privacy Notice applies to all of the websites, software applications ("Apps"), and/or booking and payment platforms ("Platforms") offered by LocalDrive Technologies LTD or its subsidiaries or affiliated companies (collectively referred to as "LocalDrive Services").
        </p>
        <p>
          "LocalDrive", "we", "us", or "our" in this Privacy Notice means the LocalDrive entity that is responsible for processing your personal information.
        </p>
      </section>

      <section id="definitions">
        <h1>Definitions</h1>
        <ul style={{ listStyleType: "square", paddingLeft: "1rem" }}>
          <li><strong>Account:</strong> means a LocalDrive Account.</li>
          <li><strong>Cookies:</strong> A cookie is a small data file transferred to your computer or mobile device. It enables us to remember your account log-in information, IP address, web traffic, number of times you visit, browser type and version, device details, and date/time of visits.</li>
          <li><strong>LocalDrive:</strong> means LocalDrive Technologies LTD and subsidiaries or affiliates.</li>
          <li><strong>Personal Information:</strong> Any information that can be used to identify a living person including email address, phone number, password, payment details, financial information (such as bank account number), Government-issued identity documents, or learner license information. It may also include anonymous information that is linked to you, such as your internet protocol (IP), log-in information, address, location, device, or booking/transaction data.</li>
          <li><strong>Sites:</strong> means any platform including but not limited to mobile applications, websites, and social media platforms.</li>
          <li><strong>User:</strong> means an individual who uses the Services or accesses the Sites and has agreed to use the end services of LocalDrive.</li>
          <li><strong>Special Categories of Personal Information:</strong> means details about your race or ethnicity, religious or philosophical beliefs, sex life, sexual orientation, political opinions, trade union membership, health information, and genetic or biometric data.</li>
        </ul>
      </section>

      <section id="privacy-principles">
        <h1>Our Privacy Principles</h1>
        <ol>
          <li><strong>Empower the individual</strong> – You should be in charge of your personal information and make voluntary choices about your data.</li>
          <li><strong>Secure personal information</strong> – We do not take your trust for granted. We ensure appropriate security measures are in place to protect your information.</li>
          <li><strong>Transparency and education</strong> – We want you to clearly understand what personal information is collected, how, why, and how it is secured.</li>
          <li><strong>Abide by local laws</strong> – Our privacy practices comply with Nigerian Data Protection Act (NDPA 2023) and other applicable local regulations. If LocalDrive expands internationally, local laws will also be respected.</li>
          <li><strong>Collect only what is needed</strong> – We collect and store personal data only to provide our Services effectively, avoiding unnecessary or excessive data collection.</li>
        </ol>
      </section>

      <section id="personal-information">
        <h2>Personal Information We May Collect About You</h2>
        <ul>
          <li><strong>Identity Data:</strong> Full name, government-issued identity number (such as driver's license or national ID), and date of birth (for learner verification).</li>
          <li><strong>Contact Data:</strong> Address, email, telephone number, device details, and billing details.</li>
          <li><strong>Instructor & Learner Data:</strong> Driving qualifications, lesson records, progress reports, scheduling, and feedback.</li>
          <li><strong>Identification Documents:</strong> Driver's license, learner's permit, or national identity card, and photographs (if applicable).</li>
          <li><strong>Log/Technical Information:</strong> When you access LocalDrive services, our servers automatically record information such as IP address, browser type, links clicked, session duration, unique device identifier, and location data.</li>
          <li><strong>Financial Data:</strong> Payment account number, bank details, transaction history, package purchases, and refunds.</li>
          <li><strong>Transactional Data:</strong> Information related to lesson bookings, cancellations, completed packages, and payments.</li>
          <li><strong>Marketing & Communications Data:</strong> Your subscription preferences, records of marketing consents, and opt-outs.</li>
          <li><strong>Records of your discussions with us:</strong> Any communication you have with our support team.</li>
        </ul>
        <p>We may also collect, store, and use anonymized or aggregated data (e.g., statistics or trends) that does not directly identify you.</p>
        <p>As a principle, we do not intentionally collect Special Categories of Personal Information. If ever required, we will ensure full compliance with Nigerian data protection laws.</p>
      </section>

      <section id="how-we-get-info">
        <h2>How We Get Your Personal Information</h2>
        <ul>
          <li>Sign up for a LocalDrive Account.</li>
          <li>Book or purchase lesson packages.</li>
          <li>Use any of our Services.</li>
          <li>Contact customer support.</li>
          <li>Fill out online forms (e.g., waitlist, booking, or licensing forms).</li>
          <li>Communicate with us directly.</li>
        </ul>
      </section>

      <section id="lawful-basis">
        <h2>Lawful Basis for Processing</h2>
        <ul>
          <li><strong>Consent –</strong> When you voluntarily provide information by using our Services.</li>
          <li><strong>Contractual necessity –</strong> To provide you with lesson booking, progress tracking, and payments.</li>
          <li><strong>Legal obligations –</strong> To comply with laws such as financial reporting, anti-fraud, or FRSC road safety requirements.</li>
          <li><strong>Legitimate interests –</strong> To improve our Services, enhance user safety, and develop features relevant to learners and instructors.</li>
        </ul>
      </section>

      <section id="how-we-use">
        <h2>How We May Use Your Personal Information</h2>
        <ul>
          <li>Create and manage user accounts (learners and instructors).</li>
          <li>Verify your identity and eligibility to use LocalDrive Services.</li>
          <li>Facilitate bookings, payments, cancellations, and refunds.</li>
          <li>Track learner progress and completed packages.</li>
          <li>Improve safety, prevent fraud, and resolve disputes.</li>
          <li>Communicate with you about updates, offers, or promotions (with your consent).</li>
          <li>Evaluate and improve our products and services.</li>
          <li>Comply with applicable laws and regulatory requirements.</li>
          <li>Use analytics to improve the platform and user experience.</li>
        </ul>
      </section>

      <section id="data-security">
        <h2>Data Security and Retention</h2>
        <p>The security of your Personal Information is important to us. We apply technical, administrative, and physical safeguards to protect your data, including:</p>
        <ul>
          <li>Secure servers and encryption protocols.</li>
          <li>Access controls for authorized personnel only.</li>
          <li>Firewalls and monitoring tools to prevent unauthorized access.</li>
        </ul>
        <p>Where you use a password for your Account, you must keep it confidential and not share it with anyone.</p>
        <p>
          We will retain your information only as long as reasonably necessary to provide Services to you, comply with legal obligations, resolve disputes, and enforce agreements. When no longer needed, data will be securely deleted or anonymized.
        </p>
      </section>

      <section id="cookies">
        <h2>Cookies and Advertising</h2>
        <p>
          Like many websites, we use cookies to distinguish you from other users, improve functionality, and customize your experience.
        </p>
        <p>
          <strong>Third-Party Advertising:</strong> We partner with Google AdSense to display advertisements on our website. Google and its partners may use cookies and similar technologies to serve ads based on your prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet.
        </p>
        <p>
          You may opt out of personalized advertising by visiting{" "}
          <a 
            href="https://www.google.com/settings/ads" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-hover font-medium transition-colors underline"
          >
            Google Ads Settings
          </a>
          {" "}or by visiting{" "}
          <a 
            href="http://www.aboutads.info/choices/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-hover font-medium transition-colors underline"
          >
            www.aboutads.info
          </a>.
        </p>
        <p>
          You may disable cookies in your browser, but doing so may limit certain features of our Services. For details, please review our{" "}
          <Link 
            to="/cookies-policy"
            className="text-primary hover:text-primary-hover font-medium transition-colors"
          >
            Cookies Policy
          </Link>.
        </p>
      </section>

      <section id="updates">
        <h2>Updates to This Privacy Notice</h2>
        <p>
          We may revise this Privacy Notice from time to time to reflect new features, services, or regulatory requirements. Updated versions will be posted on our website/app with a revised "Last Updated" date. If material changes affect your rights, we will notify you via email or platform notification.
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default PrivacyPolicy;
