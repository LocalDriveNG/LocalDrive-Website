import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@6.4.1";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: WelcomeEmailRequest = await req.json();

    console.log("Sending newsletter welcome email to:", email);

    // Send welcome email
    const emailResponse = await resend.emails.send({
      from: "LocalDrive <noreply@localdriveapp.com>",
      to: [email],
      subject: "Welcome to LocalDrive Newsletter",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Welcome to LocalDrive Newsletter</title>
          <style>
            body {
              font-family: 'Poppins', Arial, sans-serif;
              background-color: #fffeff;
              margin: 0;
              padding: 0;
              color: #333333;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background-color: #ffffff;
              border-radius: 16px;
              box-shadow: 0 2px 12px rgba(0, 100, 169, 0.08);
              overflow: hidden;
            }
            .header {
              background-color: #ffffff;
              text-align: center;
              padding: 40px 20px 30px;
              color: #0064a9;
            }
            .header img {
              width: 420px;
              margin-bottom: 10px;
            }
            .header h1 {
              margin: 10px 0 5px;
              font-size: 24px;
              color: #0064a9;
            }
            .header p {
              font-size: 14px;
              margin-top: 4px;
              color: #0064a9;
            }
            .content {
              padding: 30px 25px;
              line-height: 1.7;
            }
            .content h2 {
              color: #0062a8;
              font-size: 20px;
              margin-top: 0;
            }
            .content p {
              font-size: 15px;
              color: #333333;
              margin: 12px 0;
            }
            .content a {
              color: #0062a8;
              text-decoration: none;
            }
            .highlight {
              color: #0d9db9;
              font-weight: 600;
            }
            ul {
              padding-left: 18px;
              margin: 15px 0;
            }
            ul li {
              margin-bottom: 8px;
            }
            .social {
              text-align: center;
              padding: 25px 20px;
              background-color: #f4f9fc;
            }
            .social p {
              font-weight: 600;
              color: #0064a9;
              margin-bottom: 15px;
              font-size: 16px;
            }
            .social-icons {
              display: inline-block;
              text-align: center;
            }
            .social-icons a {
              display: inline-block;
              text-decoration: none;
              margin: 0 12px;
            }
            .social-icons img {
              width: 32px;
              height: 32px;
              vertical-align: middle;
            }
            .footer {
              background-color: #0064a9;
              color: #ffffff;
              text-align: center;
              padding: 15px;
              font-size: 13px;
            }
            .footer a {
              color: #d9ecff;
              text-decoration: none;
            }
            @media (max-width: 600px) {
              .content {
                padding: 25px 18px;
              }
              .header h1 {
                font-size: 20px;
              }
              .header img {
                width: 300px;
              }
              .social-icons a {
                margin: 0 8px;
              }
              .social-icons img {
                width: 28px;
                height: 28px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://localdriveapp.com/assets/localdrive-logo.png" alt="LocalDrive Logo" />
              <h1>💌 You're Officially Subscribed!</h1>
              <p>Welcome to the LocalDrive Newsletter 🚗</p>
            </div>

            <div class="content">
              <p>Hi there, 👋</p>
              <p>Thanks for subscribing to the <span class="highlight">LocalDrive Newsletter!</span></p>
              <p>
                You're now part of a growing community that's redefining how Nigerians learn to drive; smarter, safer, and stress-free.
              </p>
              <p>At LocalDrive, we don't just teach driving, we empower confidence behind the wheel with real-life lessons that fit your lifestyle.</p>

              <h2>Here's what you'll get from us:</h2>
              <ul style="list-style-type: none; padding-left: 0;">
                <li>✅ Driving tips tailored for Nigerian roads</li>
                <li>✅ Exclusive updates on our app launch</li>
                <li>✅ Stories from real learners and instructors</li>
                <li>✅ Early invites to LocalDrive events & offers</li>
              </ul>

              <p>
                We'll drop fresh insights, product updates, and opportunities straight to your inbox; no spam, just value 🚀
              </p>
              <p>
                Explore more exciting insights about driving; you can check out our blog posts <a href="https://localdriveapp.com/blog">here</a></p>
            </div>

            <div class="social">
              <p>Stay connected with us:</p>
              <div class="social-icons">
                <a href="https://www.instagram.com/getlocaldrive/">
                  <img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" alt="Instagram" />
                </a>
                <a href="https://www.linkedin.com/company/localdriveapp/">
                  <img src="https://cdn-icons-png.flaticon.com/512/1384/1384014.png" alt="LinkedIn" />
                </a>
                <a href="https://x.com/getlocaldrive?s=21">
                  <img src="https://cdn-icons-png.flaticon.com/512/5968/5968958.png" alt="X" />
                </a>
              </div>
            </div>

            <div class="footer">
              <p>Your Journey to Confident Driving Starts Here 🚗 </br>Learn, Book, Drive Smarter.</p>
              <p>© LocalDrive Technologies LTD. All rights reserved. | <a href="https://localdriveapp.com">localdriveapp.com</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (emailResponse.error) {
      throw new Error(`Email sending failed: ${JSON.stringify(emailResponse.error)}`);
    }

    console.log("Newsletter welcome email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });


  } catch (error: any) {
    console.error("Error in send-newsletter-welcome function:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    return new Response(
      JSON.stringify({ error: error.message, details: error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
