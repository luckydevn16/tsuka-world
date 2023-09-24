import { createServerClient } from "@/utils/supabase-server";

import {
  FeaturedProjectReturnType,
  FeaturedProjectType,
} from "@/types/return.types";

/**
 * Retrieves featured projects
 * @author volodymyr <volodymyrandroshchuk74@gmail.com>
 * @async
 * @param {void} Nothing
 * @returns {FeaturedProjectType[] | null}
 *
 */

export const getFeaturedProjects = async (): Promise<
  FeaturedProjectType[] | null
> => {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("project_content")
    .select(
      `
      project_id,
      title,
      description,
      icon,
      project_data(price, percent_change),
      project_image(url)
    `
    )
    .order("rating", { foreignTable: "project_data", ascending: false })
    .limit(10)
    .returns<FeaturedProjectReturnType[]>();

  if (error) return null;

  const res: FeaturedProjectType[] = [];
  if (data) {
    for (let i = 0; i < 10; i++) {
      const t: FeaturedProjectType = {
        project_id: data[i].project_id,
        title: data[i].title,
        description: data[i].description,
        icon: data[i].icon,
        project_data: data[i].project_data[0],
        project_image: data[i].project_image[0],
      };
      res.push(t);
    }
  }
  return res;
};

export default getFeaturedProjects;
