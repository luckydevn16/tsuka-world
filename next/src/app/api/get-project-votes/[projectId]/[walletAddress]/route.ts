import { getProjectVotes } from "@/actions/getProjectVotes";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { projectId: string; walletAddress: string } }
) {
  try {
    // const projectId = req.nextUrl.searchParams.get("projectId") as string;
    // const walletAddress = req.nextUrl.searchParams.get(
    //   "walletAddress"
    // ) as string;
    const response = await getProjectVotes(params.projectId, params.walletAddress);
    return NextResponse.json({ success: true, data: response });
  } catch (err) {
    return NextResponse.json({ success: false, data: { error: err } });
  }
}
