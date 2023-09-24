"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.G_QUERY_GetQuotePrice = exports.getTokenNamesFromPair = exports.G_QUERY_GetTokenPair = void 0;
const axios_1 = __importDefault(require("axios"));
const G_QUERY_GetTokenPair = (pair_address) => {
    return axios_1.default.post("https://graphql.bitquery.io", {
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
    }, {
        headers: {
            "X-API-KEY": process.env.BITQUERY_API_KEY,
        },
    });
};
exports.G_QUERY_GetTokenPair = G_QUERY_GetTokenPair;
/**
 * Server-Side
 * Gets the two token names from the provided pair address
 * @param pair_address
 * @returns
 */
function getTokenNamesFromPair(pair_address) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const tokenPairResponse = (_a = (yield (0, exports.G_QUERY_GetTokenPair)(pair_address))) === null || _a === void 0 ? void 0 : _a.data;
        if (!tokenPairResponse.data.ethereum.dexTrades[0]) {
            return { success: false };
        }
        const { token0, token1 } = tokenPairResponse.data.ethereum.dexTrades[0];
        let baseToken, pairedToken;
        if ([
            process.env.WETH_ADDR,
            process.env.DAI_ADDR,
            process.env.USDT_ADDR,
            process.env.USDC_ADDR,
        ].includes(String(token0.address).toLowerCase())) {
            baseToken = token1;
            pairedToken = token0;
        }
        else {
            baseToken = token0;
            pairedToken = token1;
        }
        return {
            success: true,
            tokenPairInfo: {
                baseToken,
                pairedToken
            }
        };
    });
}
exports.getTokenNamesFromPair = getTokenNamesFromPair;
const G_QUERY_GetQuotePrice = (baseCurrency, quoteCurrency, timeBefore) => __awaiter(void 0, void 0, void 0, function* () {
    return axios_1.default.post("https://graphql.bitquery.io", {
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
    }, {
        headers: {
            "X-API-KEY": process.env.BITQUERY_API_KEY,
        },
    });
});
exports.G_QUERY_GetQuotePrice = G_QUERY_GetQuotePrice;
