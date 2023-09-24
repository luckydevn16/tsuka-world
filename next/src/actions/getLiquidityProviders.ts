import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/lib/database.types";

import { createServiceRoleClient } from "@/utils/supabase-server";

export type TypedSupabaseClient = SupabaseClient<Database>;

type LiquidityProvider = {
    id: number;
    rank: number;
    wallet_address: string;
    amount_sent: number;
}

export default async function getLiquidityProviders(): Promise<LiquidityProvider[]> {
  const supabase = createServiceRoleClient()

  try {
    const providers = await supabase
      .from("liquidity_providers")
      .select("id, rank, wallet_address, amount_sent")
      .order("rank", { ascending: true })
      .returns<LiquidityProvider[]>();

    return providers.data ?? [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error(error);
    return []
  }
}
