import { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export const handler: Handler = async () => {
  try {
    // Simple test: fetch 1 row from the test table
    const { data, error } = await supabase.from("test").select("id").limit(1);

    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ status: "error", message: error.message }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        message: "Supabase connection successful ✅",
        sample: data,
      }),
    };
  } catch (err) {
    // fallback, just convert the error to a string
    return {
      statusCode: 500,
      body: JSON.stringify({ status: "error", message: String(err) }),
    };
  }
};
