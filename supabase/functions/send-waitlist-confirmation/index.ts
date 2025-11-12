import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};
const handler = async (req)=>{
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders
    });
  }
  try {
    const { firstName, lastName, email } = await req.json();
    console.log("Processing waitlist confirmation for:", email);
    // Send confirmation email
    const emailResponse = await resend.emails.send({
      from: "LocalDrive <noreply@localdriveapp.com>",
      to: [
        email
      ],
      subject: "Welcome to the LocalDrive Waitlist!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
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
              text-align: center;
              padding: 20px 0;
              border-bottom: 2px solid #2563eb;
            }
            .header .logo {
              max-width: 150px;
              height: auto;
            }
            .official {
              margin: 10px 0 5px;
              font-size: 24px;
              color: #0064a9;
            }
            .welcome {
              font-size: 14px;
              margin-top: 4px;
              color: #0064a9;
            }
            .content {
              padding: 30px 0;
            }
            h1 {
              color: #2563eb;
              font-size: 24px;
              margin-bottom: 20px;
            }
            p {
              margin-bottom: 15px;
              font-size: 16px;
            }
            .highlight {
              background-color: #eff6ff;
              padding: 15px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .list {
              list-style-type: none;
              padding-left: 0;
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
            .footer p {
              color: #ffffff;
            }
            @media (max-width: 600px) {
              .content {
                padding: 25px 18px;
              }
              .header h1 {
                font-size: 20px;
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
            <img src="https://localdriveapp.com/assets/localdrive-logo.png" alt="LocalDrive Logo" class="logo" />
          </div>
          
          <div class="content">
            <h1 class="official">💌 You're Officially Waitlisted!</h1>
            <p class="welcome">Welcome to the LocalDrive Waitlist 🚗</p>
            <h1>Hi ${firstName}! 👋</h1>
            
            <p>Thank you for joining our waitlist! We're thrilled to have you as part of our community.</p>
            <p>You’ve just taken the first step toward stress-free, real-world driving with support that fits your lifestyle.</p>

            <p>LocalDrive isn’t a driving school — it’s an easier way to learn.</p>
            <p>We're building the future of driving education in Nigeria, connecting learners with certified instructors through our modern platform.</p>
            
            <div class="highlight">
              <p><strong>Here’s what you can expect: </strong></p>
              <ul class="list">
                <li>✅ One-on-one lessons with professionals near you </li>
                <li>✅ Practical training built for Nigerian traffic realities </li>
                <li>✅ Flexible schedules that work for you</li>
                <li>✅ In-app tools to track your driving progress</li>
              </ul>
            </div>

            <div class="highlight">
              <p><strong>As a waitlist member, you’ll get: </strong></p>
              <ul class="list">
                <li>🔹 Early access when we launch</li>
                <li>🔹 Exclusive pre-launch updates & offers</li>
                <li>🔹 A first look at our mobile learning platform</li>
              </ul>
            </div>
            
            <p>Stay tuned for exciting updates!</p>
            
            <p>Best regards,<br>The LocalDrive Team</p>
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
              <p>Your Journey to Confident Driving Starts Here 🚗 <br>Learn, Book, Drive Smarter.</p>
              <p>&copy; ${new Date().getFullYear()} LocalDrive Technologies LTD. | <a href="https://localdriveapp.com">localdriveapp.com</a></p>
            </div>
          </div>
        </body>
        </html>
      `
    });
    console.log("Waitlist confirmation email sent successfully:", emailResponse);
    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  } catch (error) {
    console.error("Error in send-waitlist-confirmation function:", error);
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  }
};
serve(handler);
