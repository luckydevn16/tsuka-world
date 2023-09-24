import { Etherscan } from "@/lib/server/etherscan";
import { getPriceData } from "@/lib/server/tokenData";
import { TokenProject } from "@/types";
import { createServiceRoleClient } from "@/utils/supabase-server";
import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

export async function POST(
  req: Request
) {
  try {
    const supabase = createServiceRoleClient()
    const tokens = (await supabase.from("project_content")
                                 .select(`
                                    contract_address,
                                    pair_address,
                                    project_data(
                                        *
                                    )`).neq("contract_address",""))?.data
    if(!tokens) return NextResponse.json({ ok: false });

    //Get updated market cap, liquidity, price, percent change, and holders
    for(const token of tokens) {
      const project: TokenProject = {
        contract_address: token.contract_address,
        pair_address: token.pair_address,
        project_data: {
          id: token.project_data[0].id,
          created_at: token.project_data[0].created_at,
          project_id: token.project_data[0].project_id,
          market_cap: token.project_data[0].market_cap,
          liquidity_usd: token.project_data[0].liquidity_usd,
          deployer_funds: token.project_data[0].deployer_funds,
          rating: token.project_data[0].rating,
          category: token.project_data[0].category,
          price: token.project_data[0].price,
          percent_change: token.project_data[0].percent_change,
          holders: token.project_data[0].holders,
          is_audited: token.project_data[0].is_audited
        }
      }

      const pricingData = await getPriceData(project)
      //console.log(project.pair_address)
      //console.log(pricingData)

      project.project_data.price = pricingData.price
      project.project_data.percent_change = pricingData.percentChange

      const marketCap = await getMarketCap(project)
      //console.log("$" +  marketCap.toLocaleString("en-us", {maximumFractionDigits:2}))

      const holders = await getHolders(project)
      //console.log("Holders: " + holders)

      const result = await supabase.from("project_data")
                .update({
                  price: project.project_data.price,
                  percent_change: project.project_data.percent_change,
                  market_cap: marketCap,
                  holders: holders
                })
                .eq("id", project.project_data.id)
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ success: false, data: { error: err } });
  }
}

async function getMarketCap(token: TokenProject): Promise<number> {
  try {
      if(token.contract_address && token.project_data.price) {
          const marketCap = await Etherscan.getFDV(token.contract_address, token.project_data.price)
          return marketCap
      }
  } catch (e) {
      console.log(`Unable to get market cap for ${token.contract_address}`)
      console.log(e)
  }

  return 0
}

async function getHolders(token: TokenProject): Promise<number> {
  try {
      if(token.contract_address) {
          const holders = (await axios.get(`https://api.ethplorer.io/getTokenInfo/${token.contract_address}?apiKey=freekey`)).data.holdersCount
          return holders
      }
  } catch (e) {
      console.log(`Unable to get holders for ${token.contract_address}`)
      console.log(e)
  }

  return 0
}