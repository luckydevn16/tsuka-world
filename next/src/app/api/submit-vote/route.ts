import submitVote from "@/lib/server/votes/submit-vote";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(req.body);
  try {
    const { projectId, walletAddress, vote } = body;
    const response = await submitVote(projectId, walletAddress, vote);
    return NextResponse.json({ success: response.success, data: null });
  } catch (err) {
    return NextResponse.json({ success: false, data: { error: err } });
  }
}
