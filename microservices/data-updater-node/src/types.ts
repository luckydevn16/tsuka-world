export type TokenProject = {
    contract_address: string,
    pair_address: string,
    project_data: TokenData
}
  
export type TokenData = {
    id: number,
    created_at: string,
    project_id: number,
    market_cap: number,
    liquidity_usd: number,
    deployer_funds: number,
    rating: number,
    category: string,
    price: number,
    percent_change: number,
    holders: number,
    is_audited: boolean
}