import { createServiceRoleClient } from "@/utils/supabase-server";
import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

type DuneRow = {
  rank: number;
  sender: string;
  total_sent_eth: number
}

export async function POST(
  req: NextRequest
) {
  try {
    const supabase = createServiceRoleClient()

    //Run Dune query
    const {data} = await axios.get(`https://api.dune.com/api/v1/query/2638682/results?api_key=${process.env.DUNE_API_KEY}`)
    const rows: DuneRow[] = data.result.rows

    //Delete all data from table
    const delete_result = await supabase.from("liquidity_providers").delete().neq("id","0")

    //Object to be inserted into db
    const insertData = rows.map(row => ({
      wallet_address: row.sender,
      amount_sent: row.total_sent_eth,
      rank: row.rank
    }))

    //Write to table
    const result = await supabase.from("liquidity_providers").insert(insertData)
    
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ success: false, data: { error: err } });
  }
}
