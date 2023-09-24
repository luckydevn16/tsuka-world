import getProjectImages from "@/actions/getProjectImages";
import submitReport from "@/lib/server/submit-report";
import { NextResponse } from "next/server";

export async function GET(
  req: Request
) {
  const {searchParams} = new URL(req.url);
  const id=searchParams.get('projectId');
  console.log("id = ", id);
  try{
    const images = await getProjectImages({projectId:id as string});
    if(!images) throw 'Images not found';
    else {
      return NextResponse.json(images);
    }
  } catch(err) {
    return NextResponse.json(err)
  }
}
