import submitReport from "@/lib/server/submit-report";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  const body = await req.json()
  console.log(req.body)
  try {
    const error = await submitReport(body.walletAddress, body.reason, body.description, body.projectId);
    if(error) throw error
    return NextResponse.json({success: true, data: null});
  } catch (err) {
    return NextResponse.json({success: false, data: {error: err}});
  }
}
