export type activity_feed = {
  activity?: string;
  created_at?: string;
  id: number;
};
export type cms = {
  created_at?: string;
  hero_description?: string;
  hero_header?: string;
  id: number;
};
export type project_content = {
  created_at?: string;
  title?: string;
  description?: string;
  site_link?: string;
  telegram_link?: string;
  twitter_link?: string;
  instagram_link?: string;
  youtube_link?: string;
  discord_link?: string;
  email?: string;
  supabase_user_id?: string;
  contract_address?: string;
  icon?: string;
  pair_address?: string;
  project_id: number;
  is_featured?: boolean;
};
export type project_data = {
  category?: string;
  created_at?: string;
  deployer_funds?: number;
  holders?: number;
  id: number;
  liquidity_usd?: number;
  market_cap?: number;
  percent_change?: number;
  price?: number;
  project_id?: number;
  rating?: number;
  is_audited?: boolean;
};
export type project_image = {
  created_at?: string;
  id?: number;
  project_id?: number;
  url?: string;
};
export type project_score = {
  created_at?: string;
  downvotes?: number;
  id: number;
  project_id: number;
  score?: number;
  upvotes?: number;
};
export type project_votes = {
  upvotes: number;
  downvotes: number;
  user_status: boolean | null;
  rating: number;
};
export type reports = {
  category?: string;
  complaint?: string;
  created_at?: string;
  id: number;
  project_id?: number;
  reporter_wallet_address?: string;
};
export type user_votes = {
  created_at?: string;
  id: number;
  is_upvote: boolean | null;
  project_id?: number;
  wallet_address?: string;
};
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      activity_feed: {
        Row: activity_feed;
        Insert: activity_feed;
        Update: activity_feed;
      };
      cms: {
        Row: cms;
        Insert: cms;
        Update: cms;
      };
      project_content: {
        Row: project_content;
        Insert: project_content;
        Update: project_content;
      };
      project_data: {
        Row: project_data;
        Insert: project_data;
        Update: project_data;
      };
      project_image: {
        Row: project_image;
        Insert: project_image;
        Update: project_image;
      };
      project_score: {
        Row: project_score;
        Insert: project_score;
        Update: project_score;
      };
      reports: {
        Row: reports;
        Insert: reports;
        Update: reports;
      };
      user_votes: {
        Row: user_votes;
        Insert: user_votes;
        Update: user_votes;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
