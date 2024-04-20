import { u8, struct } from "@solana/buffer-layout";
import { u64 } from "@solana/buffer-layout-utils";
const SwapBaseOutLog = struct([
    u8('log_type'),
    u64('max_in'),
    u64('amount_out'),
    u64('direction'),
    u64('user_source'),
    u64('pool_coin'),
    u64('pool_pc'),
    u64('deduct_in'),
]);
const SwapBaseInLog = struct([
    u8('log_type'),
    u64('amount_in'),
    u64('minimum_out'),
    u64('direction'),
    u64('user_source'),
    u64('pool_coin'),
    u64('pool_pc'),
    u64('out_amount'),
]);

const log = Buffer.from("A8MXBEoAAAAAAAAAAAAAAAACAAAAAAAAAF87xHkAAAAABQXqwKp1AgBngrqXbRcAAH49vwIAAAAA", "base64")
const swapBaseOut = SwapBaseOutLog.decode(log);
console.log(swapBaseOut)