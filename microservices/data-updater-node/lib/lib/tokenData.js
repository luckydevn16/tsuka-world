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
Object.defineProperty(exports, "__esModule", { value: true });
exports.percentChange = exports.getTokenPrice = exports.getPriceData = void 0;
const g_queries_1 = require("../bitquery/g_queries");
/**
 * Gets updated current price and percent change
 * @param token
 * @returns
 */
function getPriceData(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [earliest_price, latest_price] = yield Promise.all([
                (yield (0, exports.getTokenPrice)(token.pair_address, token.contract_address, true)).base_price,
                (yield (0, exports.getTokenPrice)(token.pair_address, token.contract_address, false)).base_price
            ]);
            const percent_change = percentChange(earliest_price, latest_price);
            return {
                price: latest_price,
                percentChange: percent_change
            };
        }
        catch (e) {
            console.log(`Error getting data for ${token.contract_address}`);
            console.log(e);
        }
        return {
            price: 0,
            percentChange: 0
        };
    });
}
exports.getPriceData = getPriceData;
const getTokenPrice = (pair_address, token_address, yesterday = false) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    const timeBefore = (yesterday
        ? new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
        : new Date()).toISOString();
    if (!pair_address) {
        console.log("token-price.ts: No pair address provided");
        return {
            base_price: 0,
            quote_price: 0
        };
    }
    //Query bitquery
    const tokenPairResponse = yield (0, g_queries_1.G_QUERY_GetTokenPair)(pair_address);
    //Return 0 if pair is not found
    if (!((_c = (_b = (_a = tokenPairResponse === null || tokenPairResponse === void 0 ? void 0 : tokenPairResponse.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.ethereum) === null || _c === void 0 ? void 0 : _c.dexTrades[0])) {
        return { base_price: 0, quote_price: 0 };
    }
    //Get token addresses from pair
    const dexTrades = (_f = (_e = (_d = tokenPairResponse === null || tokenPairResponse === void 0 ? void 0 : tokenPairResponse.data) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.ethereum) === null || _f === void 0 ? void 0 : _f.dexTrades;
    const { token0: { address: token0Address }, token1: { address: token1Address }, } = dexTrades[0];
    let tokenAddress, pairedTokenAddress;
    if (token0Address.toLowerCase() === token_address.toLowerCase()) {
        tokenAddress = token0Address;
        pairedTokenAddress = token1Address;
    }
    else {
        tokenAddress = token1Address;
        pairedTokenAddress = token0Address;
    }
    //Get the price of the token
    const quotePriceResponse = yield (0, g_queries_1.G_QUERY_GetQuotePrice)(tokenAddress, pairedTokenAddress, timeBefore);
    //If no trades are found
    if (!quotePriceResponse || ((_j = (_h = (_g = quotePriceResponse === null || quotePriceResponse === void 0 ? void 0 : quotePriceResponse.data) === null || _g === void 0 ? void 0 : _g.data) === null || _h === void 0 ? void 0 : _h.ethereum) === null || _j === void 0 ? void 0 : _j.dexTrades) == null || ((_o = (_m = (_l = (_k = quotePriceResponse === null || quotePriceResponse === void 0 ? void 0 : quotePriceResponse.data) === null || _k === void 0 ? void 0 : _k.data) === null || _l === void 0 ? void 0 : _l.ethereum) === null || _m === void 0 ? void 0 : _m.dexTrades) === null || _o === void 0 ? void 0 : _o.length) == 0) {
        return { base_price: 0, quote_price: 0 };
    }
    const quoteDexTrades = (_r = (_q = (_p = quotePriceResponse === null || quotePriceResponse === void 0 ? void 0 : quotePriceResponse.data) === null || _p === void 0 ? void 0 : _p.data) === null || _q === void 0 ? void 0 : _q.ethereum) === null || _r === void 0 ? void 0 : _r.dexTrades;
    const { quotePrice: basePrice } = quoteDexTrades[0];
    const baseQuotePrice = basePrice;
    const baseCurrency = pairedTokenAddress;
    const quoteCurrency = pairedTokenAddress === process.env.WETH_ADDR
        ? process.env.USDC_ADDR
        : process.env.USDT_ADDR;
    const baseQuotePriceResponse = yield (0, g_queries_1.G_QUERY_GetQuotePrice)(baseCurrency, quoteCurrency, timeBefore);
    if (!baseQuotePriceResponse.data.data.ethereum.dexTrades[0]) {
        return { base_price: 0, quote_price: 0 };
    }
    const { quotePrice: quoteQuotePrice } = baseQuotePriceResponse.data.data.ethereum.dexTrades[0];
    return {
        base_price: baseQuotePrice * quoteQuotePrice,
        quote_price: quoteQuotePrice,
    };
});
exports.getTokenPrice = getTokenPrice;
function percentChange(initial, final) {
    return 100 * ((final - initial) / initial);
}
exports.percentChange = percentChange;
