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
      subject: "Welcome to LocalDrive Newsletter!",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 20px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Welcome to LocalDrive!</h1>
                      </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-top: 0;">
                          Thank you for subscribing to the LocalDrive newsletter!
                        </p>
                        <p style="color: #333333; font-size: 16px; line-height: 1.6;">
                          You'll now receive the latest updates about:
                        </p>
                        <ul style="color: #333333; font-size: 16px; line-height: 1.8;">
                          <li>Driving tips and road safety advice</li>
                          <li>New features and platform updates</li>
                          <li>Exclusive offers for our community</li>
                        </ul>
                        <p style="color: #333333; font-size: 16px; line-height: 1.6;">
                          We're excited to have you on board!
                        </p>
                      </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f8f9fa; padding: 30px; text-align: center;">
                        <p style="color: #666666; font-size: 14px; margin: 0 0 10px 0;">
                          © 2025 LocalDrive. All rights reserved.
                        </p>
                        <p style="color: #999999; font-size: 12px; margin: 0;">
                          You're receiving this email because you subscribed to our newsletter.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
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
