import { logger } from './logger';
import { PoolMonitor } from './monitor'

import { PublicKey, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { SolanaParser } from "@debridge-finance/solana-transaction-parser";
//import { RaydiumIDL } from "./idl/raydium_idl/idl.json";
import { RaydiumAmm, raydiumAmmProgram } from "./raydium/raydiumidl";
//import { BN, Idl, IdlTypes } from "@coral-xyz/anchor";
import idl from "./raydium/idl/raydium_idl/idl.json";
import { RaydiumAmmCoder } from "./raydium/coder";
import { Idl } from "@coral-xyz/anchor";

import dotenv from "dotenv";

const { struct, u8, blob } = require('@solana/buffer-layout');

const myStructure = struct([
    u8('aByte'),
    blob(32, 'aBlob')
]);

dotenv.config();

//const rpcConnection = new Connection(process.env.SOLANA_RPC_ENDPOINT_2);
let connection = new Connection(`${process.env.RPC_HOST}`);
//console.log(raydiumIdl.instructions);
let raydium = raydiumAmmProgram();
console.log(raydium.idl.name);
console.log(raydium.idl.version);
console.log(raydium.idl.instructions[0]);

const coder = new RaydiumAmmCoder(idl as Idl);
const result = coder.instruction.decode(
    Buffer.from("0bf70a9c01000000006417427900000000", "hex")
);
console.log(result);

//const txParser = new SolanaParser([{ idl: raydium.idl, programId: "CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK" }]);

// const parsed = await txParser.parseTransaction(
//     connection,
//     "3bSaEg71kkWDPtG94mn9bY8k2D7mABaqrQqL4F5JvzAEwukjqqwkjGhHBCb9fS5wVe1AG1J8i76ScKTZ59VGgJzt",
//     false,
// );

// console.log(parsed);

// const tokenSwapIx = parsed?.find((pix) => pix.name === "swap");

// console.log(tokenSwapIx);



// (async () => {
//     logger.info('start monitor');
//     try {
//         let monitor = new PoolMonitor();
//         await monitor.init();
//         await monitor.subscribeAll();
//         //await monitor.subscribeToPoolCreate();

//         //9548101793880775430??
//         // let d = await monitor.getPoolInfo('7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5');
//         // console.log(d.poolOpenTime);
//         // console.log(d.status);
//     } catch (error) {
//         logger.error('An error occurred:', error);
//     }
// })();
