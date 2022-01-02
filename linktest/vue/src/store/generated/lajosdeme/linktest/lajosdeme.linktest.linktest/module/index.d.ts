import { StdFee } from "@cosmjs/launchpad";
import { Registry, OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgUpdateQuote } from "./types/linktest/tx";
import { MsgRequestQuote } from "./types/linktest/tx";
import { MsgDeleteQuote } from "./types/linktest/tx";
import { MsgCreateQuote } from "./types/linktest/tx";
export declare const MissingWalletError: Error;
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
}
interface SignAndBroadcastOptions {
    fee: StdFee;
    memo?: string;
}
declare const txClient: (wallet: OfflineSigner, { addr: addr }?: TxClientOptions) => Promise<{
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }?: SignAndBroadcastOptions) => any;
    msgUpdateQuote: (data: MsgUpdateQuote) => EncodeObject;
    msgRequestQuote: (data: MsgRequestQuote) => EncodeObject;
    msgDeleteQuote: (data: MsgDeleteQuote) => EncodeObject;
    msgCreateQuote: (data: MsgCreateQuote) => EncodeObject;
}>;
interface QueryClientOptions {
    addr: string;
}
declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Promise<Api<unknown>>;
export { txClient, queryClient, };
