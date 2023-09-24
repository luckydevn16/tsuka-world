import {
  createServerComponentSupabaseClient,
  SupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

import { Database } from "@/lib/database.types";
import { createClient } from "@supabase/supabase-js";

export const createServerClient = () =>
  createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

export const createServerClientFromContext = (context: any): SupabaseClient => {
  return createServerComponentSupabaseClient(context);
};

export const createServiceRoleClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE;
  
  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE"
    );
  } else {
    return createClient(url, key)
  }
}