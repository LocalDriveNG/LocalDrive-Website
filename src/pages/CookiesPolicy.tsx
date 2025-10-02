import LegalPageLayout, { LegalSection } from "@/components/LegalPageLayout";
import { Link } from "react-router-dom";

const sections: LegalSection[] = [
  { id: "introduction", title: "Introduction", level: 1 },
  { id: "use-of-cookies", title: "Use of Cookies", level: 1 },
  { id: "control-cookies", title: "Control of Cookies", level: 1 },
  { id: "tracking-tech", title: "Other Tracking Technologies", level: 1 },
  { id: "privacy-policy", title: "Privacy Policy", level: 1 },
];

const CookiesPolicy = () => {
  return (
    <LegalPageLayout
      title="Cookies Policy"
      lastUpdated="September 2025"
      sections={sections}
    >
      <section id="introduction">
        <p>
          LocalDrive ("we," "our," or "us") may use cookies, web beacons, tracking pixels, and other tracking
          technologies when you visit our website{" "}
          <a href="https://www.localdriveapp.com" className="text-primary hover:text-primary-hover font-medium">
            www.localdriveapp.com
          </a>
          , including any other media form, media channel, mobile website, or mobile application related or connected
          thereto (collectively, the "Site"). These technologies help us customize the Site, improve your experience,
          and deliver our services more effectively.
        </p>
        <p>
          We reserve the right to make changes to this Cookie Policy at any time and for any reason. When updates are made,
          we will revise the "Last Updated" date at the top of this page.
        </p>
        <p>
          Any changes or modifications will be effective immediately upon posting the updated Cookie Policy on the Site.
          By continuing to use the Site after the posting of such changes, you acknowledge and agree to the revised Cookie Policy.
          We encourage you to periodically review this Cookie Policy to stay informed of updates.
        </p>
      </section>

      <section id="use-of-cookies">
        <h2>Use of Cookies</h2>
        <p>
          A "cookie" is a small text file that assigns you a unique identifier, which we store on your computer or device.
          Your browser then provides this identifier each time you interact with the Site.
        </p>
        <p>We use cookies on the Site to:</p>
        <ul>
          <li>Keep track of services you have used.</li>
          <li>Record registration information.</li>
          <li>Save your user preferences.</li>
          <li>Keep you logged into the Site.</li>
          <li>Facilitate booking and purchase procedures.</li>
          <li>Track the pages you visit for analytics and improvements.</li>
        </ul>
        <p>
          Cookies help us understand how the Site is being used and allow us to deliver a smoother, more personalized experience.
        </p>
      </section>

      <section id="control-cookies">
        <h2>Control of Cookies</h2>
        <p>
          Most web browsers are set to accept cookies by default. You can choose to remove or reject cookies through your
          browser's settings. Please note that disabling cookies may affect the availability and functionality of some
          parts of the Site.
        </p>
      </section>

      <section id="tracking-tech">
        <h2>Other Tracking Technologies</h2>
        <p>
          In addition to cookies, we may use other tracking technologies such as web beacons and pixel tags. These are tiny
          graphics embedded in web pages or emails that track usage patterns and email engagement.
        </p>
        <p>
          They collect limited information, such as cookie identifiers, time and date of a page or email view, and
          descriptions of the page or email where they appear. While web beacons and pixel tags cannot be individually
          declined, you can limit their effect by managing the cookies that interact with them.
        </p>
      </section>

      <section id="privacy-policy">
        <h2>Privacy Policy</h2>
        <p>
          For more details on how we collect, use, store, and protect information gathered by cookies and other tracking
          technologies, please refer to our{" "}
          <Link 
            to="/privacy-policy"
            className="text-primary hover:text-primary-hover font-medium transition-colors"
          >
            Privacy Policy
          </Link>.
        </p>
        <p>
          This Cookie Policy forms part of and is incorporated into our Privacy Policy. By using the Site, you agree to be
          bound by this Cookie Policy as well as our Privacy Policy.
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default CookiesPolicy;
