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
const axios_1 = __importDefault(require("axios"));
const etherscan_1 = require("./lib/etherscan");
const tokenData_1 = require("./lib/tokenData");
const supabase_server_1 = require("./utils/supabase-server");
function run() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        require('dotenv').config();
        try {
            const supabase = (0, supabase_server_1.createServiceRoleClient)();
            const tokens = (_a = (yield supabase.from("project_content")
                .select(`
                                        contract_address,
                                        pair_address,
                                        project_data(
                                            *
                                        )`).neq("contract_address", ""))) === null || _a === void 0 ? void 0 : _a.data;
            if (!tokens) {
                console.log("No tokens found");
                return;
            }
            //Get updated market cap, liquidity, price, percent change, and holders
            for (const token of tokens) {
                const project = {
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
                };
                const pricingData = yield (0, tokenData_1.getPriceData)(project);
                //console.log(project.pair_address)
                //console.log(pricingData)
                project.project_data.price = pricingData.price;
                project.project_data.percent_change = pricingData.percentChange;
                const marketCap = yield getMarketCap(project);
                //console.log("$" +  marketCap.toLocaleString("en-us", {maximumFractionDigits:2}))
                const holders = yield getHolders(project);
                //console.log("Holders: " + holders)
                const result = yield supabase.from("project_data")
                    .update({
                    price: project.project_data.price,
                    percent_change: project.project_data.percent_change,
                    market_cap: marketCap,
                    holders: holders
                })
                    .eq("id", project.project_data.id);
            }
            console.log("Successfully updated token data");
            return;
        }
        catch (err) {
            console.log("Error while updating token data");
            console.log(err);
            return;
        }
    });
}
run();
function getMarketCap(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (token.contract_address && token.project_data.price) {
                const marketCap = yield etherscan_1.Etherscan.getFDV(token.contract_address, token.project_data.price);
                return marketCap;
            }
        }
        catch (e) {
            console.log(`Unable to get market cap for ${token.contract_address}`);
            console.log(e);
        }
        return 0;
    });
}
function getHolders(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (token.contract_address) {
                const holders = (yield axios_1.default.get(`https://api.ethplorer.io/getTokenInfo/${token.contract_address}?apiKey=freekey`)).data.holdersCount;
                return holders;
            }
        }
        catch (e) {
            console.log(`Unable to get holders for ${token.contract_address}`);
            console.log(e);
        }
        return 0;
    });
}
