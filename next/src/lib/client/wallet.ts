import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider"
import {ethers} from 'ethers';

/**
 * Displays the wallet connection modal
 * @returns 
 */
export const getWeb3Modal = async () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.NEXT_PUBLIC_INFURA_ID
        }
      }
    };
  
    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions, // required
    });
  
    return web3Modal;
  };

/**
 * Gets the connected wallets address
 * @returns 
 */
export const getConnectedAddress = async (): Promise<string> => {
  // Get wallet address connected
  try {
  if (typeof window !== 'undefined') {
      const web3Mo = await getWeb3Modal();
      const provider = await web3Mo.connect();
      const signer = new ethers.providers.Web3Provider(provider).getSigner();
      const address = await signer.getAddress();
      console.log("Connected address:", address);
      if (address) {
        return address;
      } else {
        return '';
      }
    }
    return "";
  } catch(err) {
    return ""
  }
};