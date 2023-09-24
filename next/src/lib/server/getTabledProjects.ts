import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

import { TabledProjectType } from "@/types/return.types";

/**
 * Retrieves table of projects
 * @author volodymyr <volodymyrandroshchuk74@gmail.com>
 * @async
 * @param {void} Nothing
 * @returns {TabledProjectType[] | null}
 */

export const getTabledProjects = async (
  supabase: SupabaseClient
): Promise<TabledProjectType[] | null> => {
  // eslint-disable-next-line no-console
  console.log("Getting projects for table");
  const { data, error } = await supabase
    .from("project_data")
    .select(
      `
      *,
      project_content(title, icon)
    `
    )
    .order("holders", { ascending: false })
    .returns<TabledProjectType[]>();

  // eslint-disable-next-line no-console
  console.log("Data:" + data);
  // eslint-disable-next-line no-console
  console.log("Error" + error);

  if (error) return null;
  return data;
};

export default getTabledProjects;
