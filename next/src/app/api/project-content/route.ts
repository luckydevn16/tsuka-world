import submitReport from "@/lib/server/submit-report";
import { NextResponse } from "next/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { createServiceRoleClient } from "@/utils/supabase-server";

export async function POST(req: Request) {
  const supabase = createServiceRoleClient();
  const body = await req.json();
  const {content, isAudited} = body;
  console.log(content, content.project_id);
  try {
    const { data, error } = await supabase
      .from("project_content")
      .update({
        ...content
      })
      .eq("project_id", content.project_id)
      .select();
    if (error) throw error;
    const {data:data1, error: error1} = await supabase
      .from("project_data")
      .update({
        is_audited:isAudited
      })
      .eq("project_id", content.project_id)
      .select();
    if(error1) throw error1;
    console.log("after update. ", data, error);
    return NextResponse.json({ success: true, data: data });
  } catch (err) {
    return NextResponse.json({ success: false, data: { error: err } });
  }
}
