// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
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
export const registry = new Registry(types);
const defaultFee = {
    amount: [],
    gas: "200000",
};
const txClient = async (wallet, { addr: addr } = { addr: "http://localhost:26657" }) => {
    if (!wallet)
        throw MissingWalletError;
    let client;
    if (addr) {
        client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
    }
    else {
        client = await SigningStargateClient.offline(wallet, { registry });
    }
    const { address } = (await wallet.getAccounts())[0];
    return {
        signAndBroadcast: (msgs, { fee, memo } = { fee: defaultFee, memo: "" }) => client.signAndBroadcast(address, msgs, fee, memo),
        msgCreateQuote: (data) => ({ typeUrl: "/lajosdeme.linktest.linktest.MsgCreateQuote", value: MsgCreateQuote.fromPartial(data) }),
        msgRequestQuote: (data) => ({ typeUrl: "/lajosdeme.linktest.linktest.MsgRequestQuote", value: MsgRequestQuote.fromPartial(data) }),
        msgUpdateQuote: (data) => ({ typeUrl: "/lajosdeme.linktest.linktest.MsgUpdateQuote", value: MsgUpdateQuote.fromPartial(data) }),
        msgDeleteQuote: (data) => ({ typeUrl: "/lajosdeme.linktest.linktest.MsgDeleteQuote", value: MsgDeleteQuote.fromPartial(data) }),
    };
};
const queryClient = async ({ addr: addr } = { addr: "http://localhost:1317" }) => {
    return new Api({ baseUrl: addr });
};
export { txClient, queryClient, };
