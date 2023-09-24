export interface FeaturedProjectType {
  project_id: number;
  title?: string;
  description?: string;
  icon?: string;
  project_data: {
    price?: number;
    percent_change?: number;
  };
  project_image: { url?: string };
}

export interface FeaturedProjectReturnType {
  project_id: number;
  title?: string;
  description?: string;
  icon?: string;
  project_data: [
    {
      price?: number;
      percent_change?: number;
    }
  ];
  project_image: [{ url?: string }];
}

export interface TabledProjectType {
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
}

export interface HeroContentType {
  hero_header?: string;
  hero_description?: string;
}

// New features
export interface ProjectImageType {
  created_at?: string | undefined;
  id?: number | undefined;
  project_id?: number | undefined;
  url?: string | undefined;
  name?: string |undefined;
}

export interface ProjectContentType {
  title?: string;
  description?: string;
  site_link?: string;
  is_featured?: boolean;
  twitter_link?: string;
  instagram_link?: string;
  youtube_link?: string;
  telegram_link?: string;
  discord_link?: string;
  facebook_link?: string;
  contract_address?: string;
}
