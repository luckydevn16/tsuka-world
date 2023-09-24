import { SupabaseClient } from "@supabase/supabase-js";

import { Database, project_data } from "@/lib/database.types";

import { createServerClient } from "@/utils/supabase-server";

export type TypedSupabaseClient = SupabaseClient<Database>;

export type ProjectType = project_data & {
  project_content: {
    title: string;
    icon: string;
  };
};
export default async function getAllProjectsData() {
  const supabase = createServerClient();

  try {
    const projects = await supabase
      .from("project_data")
      .select("*, project_content(title,icon)")
      .returns<ProjectType[]>();

    if (!projects) {
      return null;
    }

    return {
      ...projects,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}
