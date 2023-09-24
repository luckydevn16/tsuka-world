import { TokenProject } from "./types";
import { createServiceRoleClient } from "./utils/supabase-server";
import { CDAL } from "crypto-data-abstraction-layer"

require('dotenv').config()
CDAL.init({
  bitqueryKey: process.env.BITQUERY_API_KEY ?? "",
  etherscanKey: process.env.ETHERSCAN_KEY ?? "",
  ethplorerKey: "",
  providerUrl: process.env.PROVIDER_MAINNET_URL ?? "",
})

async function run() {
    console.log("Getting updated token info...")
    
    try {
        const supabase = createServiceRoleClient()
        const tokens = (await supabase.from("project_content")
                                     .select(`
                                        contract_address,
                                        pair_address,
                                        project_data(
                                            *
                                        )`).neq("contract_address",""))?.data
        if(!tokens) {
            console.log("No tokens found")
            return
        }
    
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
    
          const pricingData = await CDAL.getPriceData(project.contract_address, project.pair_address)
          console.log(project.pair_address)
          console.log(pricingData)

          if(!pricingData.success || !pricingData?.data) {
            return
          }
    
          project.project_data.price = pricingData.data.price
          project.project_data.percent_change = pricingData.data.percentChange
    
          const marketCap = await CDAL.getFDV(project.contract_address, project.project_data.price)
          if(!marketCap.success || !marketCap?.data) {
            return
          }
          console.log("$" +  marketCap.data.toLocaleString("en-us", {maximumFractionDigits:2}))
    
          const holders = await CDAL.getHolders(project.contract_address)
          if(!holders.success || !holders?.data) {
            return
          }
          console.log("Holders: " + holders.data)
    
          const result = await supabase.from("project_data")
                    .update({
                      price: project.project_data.price,
                      percent_change: project.project_data.percent_change,
                      market_cap: marketCap,
                      holders: holders
                    })
                    .eq("id", project.project_data.id)
        }
    
        console.log("Successfully updated token data")
        return
    } catch (err) {
        console.log("Error while updating token data")
        console.log(err)
        return
    }
}

run()

setInterval(run, 1000 * 60 * 60) //Run every hour