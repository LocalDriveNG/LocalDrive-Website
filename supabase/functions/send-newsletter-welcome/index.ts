import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

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

    // Send email using Resend template
    // Replace 'newsletter-welcome' with your actual template ID or alias from Resend
    const emailResponse = await resend.emails.send({
      from: "noreply@localdriveapp.com",
      to: email,
      subject: "Welcome to LocalDrive Newsletter!",
      // Use template_id to reference your Resend template
      // You can find this in your Resend dashboard under Templates
      react: undefined, // Remove if using template_id
      html: `<h1>Welcome to LocalDrive Newsletter!</h1>
             <p>Thank you for subscribing to our newsletter!</p>
             <p>We're excited to have you on board and will keep you updated with the latest news about LocalDrive.</p>
             <p>Best regards,<br>The LocalDrive Team</p>`,
    });

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
