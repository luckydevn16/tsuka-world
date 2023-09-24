import { TokenPairInfoResult } from "@/types/tokens";
import axios from "axios";

export const G_QUERY_GetTokenPair = (pair_address: string) => {
    return axios.post(
      "https://graphql.bitquery.io",
      {
        query: `
      query getPairTokenPrice($pair_address: String)
      {
        ethereum(network: ethereum) {
          dexTrades(
            smartContractAddress: {is: $pair_address}
            options: {limit: 1}
          ) {
            exchange {
              fullName
            }
            token0: baseCurrency {
              symbol
              address
              name
            }
            token1: quoteCurrency {
              symbol
              address
              name
            }
          }
        }
      }
      `,
        variables: {
          pair_address,
        },
      },
      {
        headers: {
          "X-API-KEY": process.env.BITQUERY_API_KEY,
        },
      }
    );
};

/**
 * Server-Side
 * Gets the two token names from the provided pair address
 * @param pair_address  
 * @returns 
 */
export async function getTokenNamesFromPair(pair_address: string): Promise<TokenPairInfoResult> {
    const tokenPairResponse = (await G_QUERY_GetTokenPair(
        pair_address as string
    ))?.data;
    if (!tokenPairResponse.data.ethereum.dexTrades[0]) {
        return { success: false }
    }
    
    const { token0, token1 } = tokenPairResponse.data.ethereum.dexTrades[0];
    let baseToken, pairedToken;
    if (
      [
        process.env.WETH_ADDR,
        process.env.DAI_ADDR,
        process.env.USDT_ADDR,
        process.env.USDC_ADDR,
      ].includes(String(token0.address).toLowerCase())
    ) {
      baseToken = token1;
      pairedToken = token0;
    } else {
      baseToken = token0;
      pairedToken = token1;
    }
  
    return {
      success: true,
      tokenPairInfo: {
        baseToken,
        pairedToken
      }
    }
}

export const G_QUERY_GetQuotePrice = async (
    baseCurrency: string,
    quoteCurrency: string,
    timeBefore: string
  ) => {
    return axios.post(
      "https://graphql.bitquery.io",
      {
        query: `
        query getQuotePrice($baseCurrency: String, $quoteCurrency: String, $timeBefore: ISO8601DateTime)
        {
          ethereum(network: ethereum) {
            dexTrades(
              baseCurrency: {is: $baseCurrency}
              quoteCurrency: {is: $quoteCurrency}
              options: {desc: ["block.timestamp.time", "transaction.index"], limit: 1}
              time: {before: $timeBefore}
            ) {
              block {
                height
                timestamp {
                  time(format: "%Y-%m-%d %H:%M:%S")
                }
              }
              transaction {
                index
              }
              baseCurrency {
                symbol
              }
              quoteCurrency {
                symbol
              }
              quotePrice
            }
          }
        }
        `,
        variables: {
          baseCurrency,
          quoteCurrency,
          timeBefore,
        },
      },
      {
        headers: {
          "X-API-KEY": process.env.BITQUERY_API_KEY,
        },
      }
    );
};