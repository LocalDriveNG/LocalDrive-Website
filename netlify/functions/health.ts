import { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

exports.handler = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();

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
        message: "Supabase reachable ✅",
        session: data.session ? "active" : "no active session",
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ status: "error", message: String(err) }),
    };
  }
};
