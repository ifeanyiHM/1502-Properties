import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://hgvmdoevulnsfenaynow.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabaseServiceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, supabaseServiceRoleKey);

export default supabase;
