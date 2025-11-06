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

    // Fetch the template from Resend using the templates API
    try {
      const template = await resend.templates.get("newsletter-welcome");
      console.log("Template fetched successfully:", JSON.stringify(template, null, 2));
      
      const emailResponse = await resend.emails.send({
        from: "noreply@localdrive.com",
        to: [email],
        subject: "Welcome to LocalDrive Newsletter!",
        html: template.html || `<h1>Welcome to LocalDrive Newsletter!</h1><p>Thank you for subscribing!</p>`,
      });

      console.log("Newsletter welcome email sent successfully:", emailResponse);

      return new Response(JSON.stringify(emailResponse), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    } catch (templateError: any) {
      console.error("Error fetching template:", templateError);
      console.error("Template error details:", JSON.stringify(templateError, null, 2));
      
      // Fallback: send email without template
      const emailResponse = await resend.emails.send({
        from: "noreply@localdrive.com",
        to: [email],
        subject: "Welcome to LocalDrive Newsletter!",
        html: `<h1>Welcome to LocalDrive Newsletter!</h1><p>Thank you for subscribing!</p>`,
      });

      console.log("Newsletter welcome email sent with fallback:", emailResponse);

      return new Response(JSON.stringify(emailResponse), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

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
