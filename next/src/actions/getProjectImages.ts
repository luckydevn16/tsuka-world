import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/lib/database.types";

import { createServerClient } from "@/utils/supabase-server";

import { Params } from "@/types";

export type TypedSupabaseClient = SupabaseClient<Database>;

export default async function getProjectImages(params: Params) {
  const supabase = createServerClient();

  try {
    const { projectId } = params;

    const {data:images, error} = await supabase
      .from("project_image")
      .select("*")
      .eq("project_id", projectId);
    if (error) throw error;
    if(!images) return null;

    return images;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
}
