export type Params = {
  [key: string]: number | number[] | string | string[] | undefined;
};

export interface ApiResponse {
  success: boolean;
  data: any | null;
}

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

export type PricingData = {
  price: number,
  percentChange: number
}

export type ProjectScore = {
  id: number,
  created_at: string,
  upvotes: number,
  downvotes: number,
  score: number,
  project_id: number
}

export enum Vote {
  UPVOTE,
  DOWNVOTE,
  NO_VOTE
}

export type ProjectVotes = {
  upvotes: number;
  downvotes: number;
  rating: number;
  user_status: Vote;
}