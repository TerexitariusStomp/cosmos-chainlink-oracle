// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgCreateQuote } from "./types/linktest/tx";
import { MsgRequestQuote } from "./types/linktest/tx";
import { MsgUpdateQuote } from "./types/linktest/tx";
import { MsgDeleteQuote } from "./types/linktest/tx";


const types = [
  ["/lajosdeme.linktest.linktest.MsgCreateQuote", MsgCreateQuote],
  ["/lajosdeme.linktest.linktest.MsgRequestQuote", MsgRequestQuote],
  ["/lajosdeme.linktest.linktest.MsgUpdateQuote", MsgUpdateQuote],
  ["/lajosdeme.linktest.linktest.MsgDeleteQuote", MsgDeleteQuote],
  
];
export const MissingWalletError = new Error("wallet is required");

export const registry = new Registry(<any>types);

const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
}

interface SignAndBroadcastOptions {
  fee: StdFee,
  memo?: string
}

const txClient = async (wallet: OfflineSigner, { addr: addr }: TxClientOptions = { addr: "http://localhost:26657" }) => {
  if (!wallet) throw MissingWalletError;
  let client;
  if (addr) {
    client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
  }else{
    client = await SigningStargateClient.offline( wallet, { registry });
  }
  const { address } = (await wallet.getAccounts())[0];

  return {
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions = {fee: defaultFee, memo: ""}) => client.signAndBroadcast(address, msgs, fee,memo),
    msgCreateQuote: (data: MsgCreateQuote): EncodeObject => ({ typeUrl: "/lajosdeme.linktest.linktest.MsgCreateQuote", value: MsgCreateQuote.fromPartial( data ) }),
    msgRequestQuote: (data: MsgRequestQuote): EncodeObject => ({ typeUrl: "/lajosdeme.linktest.linktest.MsgRequestQuote", value: MsgRequestQuote.fromPartial( data ) }),
    msgUpdateQuote: (data: MsgUpdateQuote): EncodeObject => ({ typeUrl: "/lajosdeme.linktest.linktest.MsgUpdateQuote", value: MsgUpdateQuote.fromPartial( data ) }),
    msgDeleteQuote: (data: MsgDeleteQuote): EncodeObject => ({ typeUrl: "/lajosdeme.linktest.linktest.MsgDeleteQuote", value: MsgDeleteQuote.fromPartial( data ) }),
    
  };
};

interface QueryClientOptions {
  addr: string
}

const queryClient = async ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseUrl: addr });
};

export {
  txClient,
  queryClient,
};
