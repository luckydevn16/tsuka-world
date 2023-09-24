import { PricingData, TokenProject } from "@/types"
import { TokenPriceInPair } from "@/types/tokens"
import { G_QUERY_GetQuotePrice, G_QUERY_GetTokenPair } from "./bitquery/g_queries"

/**
 * Gets updated current price and percent change
 * @param token
 * @returns 
 */
export async function getPriceData(token: TokenProject): Promise<PricingData> {
    try {
        const [earliest_price, latest_price] = await Promise.all([
            (await getTokenPrice(token.pair_address, token.contract_address, true)).base_price,
            (await getTokenPrice(token.pair_address, token.contract_address, false)).base_price
        ])

        const percent_change = percentChange(earliest_price, latest_price)

        return {
            price: latest_price,
            percentChange: percent_change
        }
    } catch (e) {
        console.log(`Error getting data for ${token.contract_address}`)
        console.log(e)
    }

    return {
        price: 0,
        percentChange: 0
    }
}

export const getTokenPrice = async ( 
    pair_address: string,
    token_address: string,
    yesterday = false
  ): Promise<TokenPriceInPair> => {
    const timeBefore = (
      yesterday
        ? new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
        : new Date()
    ).toISOString();
    if(!pair_address) {
      console.log("token-price.ts: No pair address provided")
      return {
        base_price: 0,
        quote_price: 0
      }
    }
   
    //Query bitquery
    const tokenPairResponse = await G_QUERY_GetTokenPair(pair_address);
  
    //Return 0 if pair is not found
    if (!tokenPairResponse?.data?.data?.ethereum?.dexTrades[0]) {
      return { base_price: 0, quote_price: 0 };
    }
  
    //Get token addresses from pair
    const dexTrades = tokenPairResponse?.data?.data?.ethereum?.dexTrades;
    const {
      token0: { address: token0Address },
      token1: { address: token1Address },
    } = dexTrades[0];
    let tokenAddress, pairedTokenAddress;

    if(token0Address.toLowerCase() === token_address.toLowerCase()) {
        tokenAddress = token0Address;
        pairedTokenAddress = token1Address;
    } else {
        tokenAddress = token1Address;
        pairedTokenAddress = token0Address;
    }
  
    //Get the price of the token
    const quotePriceResponse = await G_QUERY_GetQuotePrice(
      tokenAddress,
      pairedTokenAddress,
      timeBefore
    );
  
    //If no trades are found
    if (!quotePriceResponse || quotePriceResponse?.data?.data?.ethereum?.dexTrades == null || quotePriceResponse?.data?.data?.ethereum?.dexTrades?.length == 0) {
      return { base_price: 0, quote_price: 0 };
    }
    
    const quoteDexTrades = quotePriceResponse?.data?.data?.ethereum?.dexTrades;
    const { quotePrice: basePrice } = quoteDexTrades[0];

    const baseQuotePrice = basePrice;
    const baseCurrency = pairedTokenAddress;

    const quoteCurrency =
    pairedTokenAddress === process.env.WETH_ADDR
        ? process.env.USDC_ADDR
        : process.env.USDT_ADDR;

    const baseQuotePriceResponse = await G_QUERY_GetQuotePrice(
    baseCurrency,
    quoteCurrency as string,
    timeBefore
    );
    if (!baseQuotePriceResponse.data.data.ethereum.dexTrades[0]) {
        return { base_price: 0, quote_price: 0 };
    }
    const { quotePrice: quoteQuotePrice } =
    baseQuotePriceResponse.data.data.ethereum.dexTrades[0];

    return {
        base_price: baseQuotePrice * quoteQuotePrice,
        quote_price: quoteQuotePrice as number,
    };
  };
  
  export function percentChange(initial: number, final: number): number {
    return 100 * ((final - initial) / initial)
  }