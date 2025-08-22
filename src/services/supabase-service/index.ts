import { createClient } from "@supabase/supabase-js";
import { supabaseUrl, supabaseAnonKey } from "@/constants/env";

const SupabaseService = createClient(supabaseUrl, supabaseAnonKey);

export default SupabaseService;
