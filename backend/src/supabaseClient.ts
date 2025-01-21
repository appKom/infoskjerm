import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "SUPABASE_URL or SUPABASE_SERVICE_KEY is not defined in environment variables."
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);
const mediaBucket = supabase.storage.from("media");

export { supabase, mediaBucket };
