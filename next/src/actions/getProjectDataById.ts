import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/lib/database.types";

import { createServerClient } from "@/utils/supabase-server";

import { Params } from "@/types";

export type TypedSupabaseClient = SupabaseClient<Database>;

export default async function getProjectDataById(params: Params) {
  const supabase = createServerClient();

  try {
    const { projectId } = params;

    const project = await supabase
      .from("project_data")
      .select("*")
      .eq("project_id", projectId)
      .single();

    if (!project) {
      return null;
    }

    return {
      ...project,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}
