import { createServerClient } from "@/utils/supabase-server";

import { HeroContentType } from "@/types/return.types";

/**
 * Retrieves hero content
 * @author volodymyr <volodymyrandroshchuk74@gmail.com>
 * @async
 * @param {void} Nothing
 * @returns {TabledProjectType}
 */

export const getHeroContent = async (): Promise<HeroContentType | null> => {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("cms")
    .select("hero_header, hero_description")
    .limit(1)
    .returns<HeroContentType>();

  if (error) return null;
  return data;
};

export default getHeroContent;
