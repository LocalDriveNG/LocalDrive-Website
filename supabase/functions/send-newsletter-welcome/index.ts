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

    // Fetch template via Resend Templates API and send using its HTML (avoids 422)
    const templateId = "b9a99cd0-74f3-4311-ad6a-47b539ffe895";
    let emailResponse: any;

    // Try to fetch the template so we can send with HTML/Text
    let templateData: any = null;
    try {
      const tplRes: any = await (resend as any).templates?.get?.(templateId);
      templateData = tplRes?.data ?? tplRes ?? null;
      console.log("Fetched Resend template:", {
        id: templateData?.id ?? templateId,
        status: templateData?.status,
        hasHtml: Boolean(templateData?.html),
        hasText: Boolean(templateData?.text),
        subject: templateData?.subject,
      });
    } catch (tplErr) {
      console.warn("Unable to fetch template via Resend Templates API, will attempt direct send.", tplErr);
    }

    try {
      if (templateData?.html || templateData?.text) {
        // Send using template HTML/Text to satisfy API requirements
        emailResponse = await resend.emails.send({
          from: "LocalDrive <noreply@localdriveapp.com>",
          to: [email],
          subject: templateData?.subject || "Welcome to LocalDrive Newsletter!",
          html: templateData?.html,
          text: templateData?.text,
        });
      } else {
        // Fallback: attempt native template send (SDKs that support it)
        emailResponse = await resend.emails.send({
          from: "LocalDrive <noreply@localdriveapp.com>",
          to: [email],
          subject: "Welcome to LocalDrive Newsletter!",
          // @ts-ignore - some SDK versions support template sending
          template: { id: templateId, variables: {} },
        } as any);
      }
    } catch (primaryErr: any) {
      console.error("Primary send failed, attempting minimal HTML fallback:", primaryErr);
      emailResponse = await resend.emails.send({
        from: "LocalDrive <noreply@localdriveapp.com>",
        to: [email],
        subject: "Welcome to LocalDrive Newsletter!",
        html: "<h1>Welcome to LocalDrive!</h1><p>Thanks for subscribing to our newsletter.</p>",
      });
    }

    if (emailResponse?.error) {
      throw emailResponse.error;
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
