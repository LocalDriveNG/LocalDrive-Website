import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WaitlistRequest {
  firstName: string;
  lastName: string;
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email }: WaitlistRequest = await req.json();

    console.log("Processing waitlist confirmation for:", email);

    // Send confirmation email
    const emailResponse = await resend.emails.send({
      from: "LocalDrive <noreply@localdriveapp.com>",
      to: [email],
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
            .header {
              text-align: center;
              padding: 20px 0;
              border-bottom: 2px solid #2563eb;
            }
            .logo {
              max-width: 150px;
              height: auto;
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
            .footer {
              text-align: center;
              padding: 20px 0;
              border-top: 1px solid #e5e7eb;
              color: #6b7280;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="https://localdriveapp.com/assets/localdrive-logo.png" alt="LocalDrive Logo" class="logo" />
          </div>
          
          <div class="content">
            <h1>Welcome to LocalDrive, ${firstName}!</h1>
            
            <p>Thank you for joining our waitlist! We're thrilled to have you as part of our community.</p>
            
            <div class="highlight">
              <p><strong>What happens next?</strong></p>
              <ul>
                <li>You'll be among the first to know when we launch</li>
                <li>Get exclusive early access to our platform</li>
                <li>Receive special offers and updates on our progress</li>
              </ul>
            </div>
            
            <p>LocalDrive is building the future of driving education in Nigeria, connecting learners with certified instructors through our modern platform.</p>
            
            <p>Stay tuned for exciting updates!</p>
            
            <p>Best regards,<br>The LocalDrive Team</p>
          </div>
          
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} LocalDrive. All rights reserved.</p>
            <p>
              <a href="https://localdriveapp.com" style="color: #2563eb; text-decoration: none;">Visit our website</a>
            </p>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Waitlist confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-waitlist-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
