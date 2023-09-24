import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/lib/database.types";

import { createServerClient } from "@/utils/supabase-server";

import { Params } from "@/types";
import getProjectImages from "./getProjectImages";

export type TypedSupabaseClient = SupabaseClient<Database>;

export default async function getProjectId() {
  const supabase = createServerClient();

  try {
    const { data, error } = await supabase.auth.getSession();
    console.log(data.session?.user);
    if(error){
      return null;
    } else {
      const user = data.session?.user;
      const email = user?.email;
      if(!email){
        return null;
      } else {
        const project_content = await supabase
          .from('project_content')
          .select("*")
          .eq('email', email)
          .single();
        
        const projectId = project_content.data?.project_id;

        if(projectId){
          return projectId;
        } else {
          return null;
        }
      }
    }
    // const { data: { user } } = await supabase.auth.getUser()
    // let email = user?.email;
    // console.log('email', email);
    // let projectId;
    // if(email){
    //   let project_ = await supabase.from('project_content').select("*").eq('email', email).single();
    //   projectId = project_.data?.project_id
    //   console.log(projectId);
    //   const project_images = await supabase
    //   .from("project_image")
    //   .select("*")
    //   .eq("project_id", projectId)
    //   console.log('project_image_by_email', project_images);
    //   if(!project_images) return null;
    //   else return project_images;
    // } else {
    //   console.log("Email not found on the table");
    //   return null;
    // }


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
}
