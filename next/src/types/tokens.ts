export type TokenPriceInPair = {
    base_price: number;
    quote_price: number;
};

export type TokenPairInfoResult = {
    success: boolean;
    tokenPairInfo?: TokenPairInfo;
}

export type TokenPairInfo = {
    baseToken?: TokenInfo;
    pairedToken?: TokenInfo;
};
  
export interface TokenInfo {
    name?: string;
    address?: string;
    symbol?: string;
}