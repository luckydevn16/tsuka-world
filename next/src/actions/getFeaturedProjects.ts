import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/lib/database.types";

import { createServerClient } from "@/utils/supabase-server";

export type TypedSupabaseClient = SupabaseClient<Database>;

export type ProjectFeaturedType = {
  title?: string;
  description?: string;
  project_id: string;
  project_image: {
    url: string;
  }[];
};
export default async function getFeaturedProjects() {
  const supabase = createServerClient();

  try {
    const project = await supabase
      .from("project_content")
      .select("title, description, project_id, project_image(url)")
      .eq("is_featured", true)
      .order("created_at", { ascending: true })
      .returns<ProjectFeaturedType[]>();

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
