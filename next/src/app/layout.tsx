export const dynamic = "force-dynamic";

import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";

import "../styles/globals.css";

import type { Database } from "@/lib/database.types";

import { createServerClient } from "@/utils/supabase-server";

import SupabaseListener from "../lib/supabase-listener";
import SupabaseProvider from "../lib/supabase-provider";
import ToastProvider from "@/components/ToastProvider";

import {
  wagmiClient,
  ethereumClient,
  projectId,
  WagmiConfig,
  Web3Modal,
} from "../lib/web3";
import { getWeb3Modal } from "@/lib/client/wallet";
import { ethers } from "ethers";

export type TypedSupabaseClient = SupabaseClient<Database>;

export const metadata = {
  title: "Tsuka World",
  description: "Tsuka World",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <WagmiConfig config={wagmiClient}>
          <ToastProvider>
            <SupabaseProvider session={session}>
              <SupabaseListener serverAccessToken={session?.access_token} />
              {children}
              <div id="modal-root"></div>
            </SupabaseProvider>

          <Web3Modal
            projectId={projectId}
            explorerExcludedWalletIds={"ALL"}
            explorerRecommendedWalletIds={[
              process.env.NEXT_PUBLIC_METAMASK_WALLET_ID as string,
              process.env.NEXT_PUBLIC_COINBASE_WALLET_ID as string,
            ]}
            ethereumClient={ethereumClient}
          />
          </ToastProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
