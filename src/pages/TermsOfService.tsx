import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-800">
                Terms of Service
              </h1>
              <div className="prose prose-lg mx-auto">
                <div className="text-lg text-muted-foreground">
                  <h2>LocalDrive Terms and Conditions</h2>
                  <p><strong>Last Modified:</strong> 25 September 2025</p>

                  <p>Welcome to LocalDrive (“we,” “us,” “our”).</p>
                  <p>
                    These Terms and Conditions (“Terms”) govern your access to and use of the LocalDrive website, applications, and related services, including all pages and platforms under 
                    <a href="https://www.localdriveapp.com">www.localdriveapp.com</a> (collectively, the “Platform”).
                  </p>
                  <p>
                    By using our Platform, you expressly and fully accept all Terms contained herein. If you disagree with any part of these Terms, you must not use the Platform.
                  </p>
                  <p><strong>PLEASE READ AND UNDERSTAND THESE TERMS OF USE CAREFULLY BEFORE PROCEEDING.</strong></p>

                  <hr />

                  <h2>Interpretation</h2>
                  <p>The following definitions apply:</p>
                  <ul>
                    <li>“Agreement” / “Terms of Use” – means these Terms and Conditions.</li>
                    <li>“Data Protection Legislation” – refers to the Nigeria Data Protection Act 2023 (NDPA) and other applicable laws and regulations.</li>
                    <li>“Effective Date” – the date of your first use of and/or access to the Services.</li>
                    <li>“Services” – LocalDrive’s platform and offerings, including booking driving instructors, managing lesson packages, progress tracking, driver’s license processing, and related support features.</li>
                    <li>“Personal Data” – has the meaning defined in the NDPA.</li>
                    <li>“Documentation” – all materials, guides, and resources provided by LocalDrive through its website, app, or other means.</li>
                  </ul>

                  <hr />

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

                  <hr />

                  <h2>Privacy Policy</h2>
                  <p>
                    By using LocalDrive, you consent to the collection, storage, and use of your information as described in our Privacy Policy. You also agree that any data you provide is accurate and lawful.
                  </p>

                  <hr />

                  <h2>Age Restriction</h2>
                  <p>You must be at least 18 years old to use LocalDrive Services.</p>

                  <hr />

                  <h2>License to Use Our Platform</h2>
                  <p>
                    We grant you a non-exclusive, revocable license to use the Platform in accordance with these Terms. You may not reproduce, modify, reverse engineer, or use LocalDrive’s intellectual property without authorization.
                  </p>

                  <hr />

                  <h2>Who May Use Our Services</h2>
                  <ul>
                    <li>You must have the legal capacity to enter a binding agreement.</li>
                    <li>If using the Services on behalf of a company or third party, you confirm you are authorized to do so.</li>
                  </ul>

                  <hr />

                  <h2>Booking, Payments, Cancellations & Refunds</h2>
                  <ol>
                    <li><strong>Packages:</strong> Lessons are purchased in packages, each containing a set number of lessons within a specified time frame.</li>
                    <li><strong>Scheduling:</strong> Lessons must be scheduled through the Platform. You can only schedule the next lesson once the previous one has been marked as completed by the instructor.</li>
                    <li><strong>Cancellation, Refund & Charge System for LocalDrive</strong></li>
                  </ol>
                  <p><strong>Payment Model</strong></p>
                  <ul>
                    <li>Users purchase Packages (each = fixed number of lessons over a fixed period).</li>
                    <li>Payments are upfront and non-transferable, subject to the policies below.</li>
                  </ul>

                  <h3>Cancellation & Refund Policy</h3>
                  <p><strong>a) Before Training Starts</strong></p>
                  <ul>
                    <li>Full refund if canceled ≥ 7 days before package start date.</li>
                    <li>50% refund if canceled 3–6 days before package start date.</li>
                    <li>No refund if canceled &lt; 72 hours before package start date.</li>
                  </ul>

                  <p><strong>b) After Training Has Started</strong></p>
                  <ul>
                    <li>Refunds are pro-rated by remaining unused lessons, minus a 10% administrative fee.</li>
                    <li>If a user completes ≥ 50% of package, no refund applies.</li>
                  </ul>

                  <h3>Lesson Rescheduling & Cancellation</h3>
                  <ul>
                    <li>Users can reschedule lessons within their package duration.</li>
                    <li>Free reschedule if done ≥ 24 hours before lesson starts.</li>
                    <li>
                      Late cancellation (&lt; 24 hours’ notice):
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

                  <h3>Learner Not Completing Training Within Package Time</h3>
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

                  <hr />

                  <h2>Prohibited Activities</h2>
                  <ul>
                    <li>Use the Platform for fraudulent, unlawful, or abusive purposes.</li>
                    <li>Impersonate another user, falsify information, or misuse instructor/learner identities.</li>
                    <li>Circumvent booking/payment processes by transacting outside the Platform.</li>
                    <li>Interfere with or attempt to exploit the Platform’s systems or users.</li>
                  </ul>

                  <hr />

                  <h2>Intellectual Property</h2>
                  <p>
                    All rights to LocalDrive’s brand, logo, app, website, and content remain our exclusive property. You may not use our name, trademarks, or materials without written consent.
                  </p>

                  <hr />

                  <h2>Amendments to Terms</h2>
                  <p>
                    We may revise these Terms at any time. Updates will be published at 
                      <Link 
                        to="/CookiesPolicy"
                        className="inline-flex items-center text-primary hover:text-primary-hover font-medium transition-colors duration-200">
                        Terms Of Service. 
                      </Link>
                    By continuing to use LocalDrive after changes, you accept the revised Terms.
                  </p>

                  <hr />

                  <h2>Account Security</h2>
                  <p>
                    You are responsible for safeguarding your account credentials. Report any unauthorized access immediately to 
                    <a href="mailto:support@localdriveapp.com">support@localdriveapp.com</a>.
                  </p>

                  <hr />

                  <h2>Service Availability</h2>
                  <p>
                    We aim for continuous service but may conduct maintenance or updates. We are not liable for interruptions beyond our control.
                  </p>

                  <hr />

                  <h2>Termination</h2>
                  <p>LocalDrive may suspend or terminate your account if you:</p>
                  <ul>
                    <li>Breach these Terms.</li>
                    <li>Engage in fraud, illegal activity, or misuse of the Platform.</li>
                    <li>Fail to comply with security or verification requirements.</li>
                  </ul>
                  <p>You may close your account at any time, subject to completion of pending transactions.</p>

                  <hr />

                  <h2>Limitation of Liability</h2>
                  <p>
                    To the maximum extent permitted by law, LocalDrive shall not be liable for any indirect, incidental, or consequential damages arising from use of our Platform.
                  </p>

                  <hr />

                  <h2>Indemnification</h2>
                  <p>
                    You agree to indemnify and hold LocalDrive harmless from any claims, damages, or costs resulting from your misuse of the Services or violation of these Terms.
                  </p>

                  <hr />

                  <h2>Dispute Resolution</h2>
                  <ul>
                    <li><strong>Negotiation & Mediation:</strong> Parties will attempt to resolve disputes in good faith within 14 days. If unresolved, disputes shall be referred to mediation under the Lagos Multi-Door Courthouse (LMDC) rules.</li>
                    <li><strong>Arbitration:</strong> If mediation fails, disputes may be referred to arbitration in Nigeria, conducted in English under applicable laws.</li>
                    <li><strong>Jurisdiction:</strong> These Terms are governed by the laws of the Federal Republic of Nigeria.</li>
                  </ul>

                  <hr />

                  <h2>Force Majeure</h2>
                  <p>
                    LocalDrive is not liable for delays or failures caused by events beyond its control (e.g., natural disasters, government actions, internet outages).
                  </p>

                  <hr />

                  <p><strong>🔹 Motto:</strong> “Your Journey to Confident Driving Starts Here 🚗 Learn, Book, Drive Smarter.”</p>
                </div>
                <h2>Contact Us</h2>
                <p className="text-sm text-muted-foreground mt-8">
                  For questions or issues regarding these Terms, email us at 📧 <a href="mailto:support@localdriveapp.com">support@localdriveapp.com</a>                
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;