import 'dotenv/config';
import { logger } from '../src/logger';
import { Connection, PublicKey, Finality } from '@solana/web3.js';
import * as fs from 'fs/promises';
// import {
//     SolanaParser,
//     parseTransactionAccounts,
// } from '@debridge-finance/solana-transaction-parser';
import {
    TestSolanaParser,
} from '../src/parser/txparser';

import RaydiumIDL from '../src/raydium/idl/raydium_idl/idl.json'
import { BorshCoder, Idl } from '@coral-xyz/anchor';
import {
    RAYDIUM_AMM_V4_PROGRAM_ID,
    RAYDIUM_CLMM_PROGRAM_ID,
} from '@jup-ag/core';
import { RaydiumAmmCoder } from '../src/raydium/coder/index.js';

let rpc = process.env.RPC_HOST;
//let wss = process.env.WSS_HOST!;
logger.info("init connection " + `${rpc}`);
let connection = new Connection(`${process.env.RPC_HOST}`);
//import { compiledInstructionToInstruction, flattenTransactionResponse, parsedInstructionToInstruction, parseTransactionAccounts } from "../parser/helpers";

(async () => {
    logger.info('start.');
    //let txid = '3bSaEg71kkWDPtG94mn9bY8k2D7mABaqrQqL4F5JvzAEwukjqqwkjGhHBCb9fS5wVe1AG1J8i76ScKTZ59VGgJzt';
    //let txid = '2xcJTe8SUbsZftcdMNwXcaHs1LNWrvKWUqjoKJJ8Z5Bt8KvymXs5zmrzHZLs6QSeoLJFFSJBEiQcNQvrQKgoL8ye';
    //let txid = '6ndV4zos3PCagdhRh1pVSvzjvtxfbHwjGtzCAGjZmkYRTVQ1rSHeTG7VXa8AkAdsgBB2m1QqrJWC5bVJ3L6THea';
    let txid = '46R1DumF6TwvBDWn7P626214EzyTniM3JiR76id9dNY6ubPXqfrn3bS6VdNJBy3ZDy2NhTDQRsVADD8zTa2ywjB8';
    let commitment: Finality = "confirmed";
    //const tx = await connection.getTransaction(txid, { commitment: commitment, maxSupportedTransactionVersion: 0 });
    const tx = await connection.getParsedTransaction(txid, { commitment: commitment, maxSupportedTransactionVersion: 0 });
    try {
        const txJson = JSON.stringify(tx, null, 2); // The '2' argument for pretty formatting
        await fs.writeFile('./example/tx_' + txid + '.json', txJson, 'utf8');
    } catch (error) {

    }

    logger.info('tx ' + tx);
    logger.info('tx ' + tx?.meta?.logMessages);
    logger.info('tx ' + tx?.transaction.message.instructions);

    logger.info('idl ' + RaydiumIDL.version);
    logger.info('idl ' + RaydiumIDL.name);
    logger.info('idl ' + RaydiumIDL.instructions);
    logger.info('idl ' + RaydiumIDL.address);

    logger.info(tx?.meta?.innerInstructions);

    /////////////////////////
    const instructions = tx?.transaction.message.instructions;
    let swaps = [];
    let index = -1;
    //jupyter aggregator
    // let JUP = 'JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4';
    // if (instructions != null) {
    //     logger.info('......');
    //     for (let i = 0; i < instructions.length; i++) {
    //         //if (this.isRaydiumSwap(instructions[i], new PublicKey(pool_account))) index = i;
    //     }

    //     let transfers_remaining = 0;
    //     let inner_instructions = tx?.meta?.innerInstructions;

    //     if (inner_instructions != null) {

    //         for (let inner_instruction of inner_instructions) {
    //             // logger.info('......' + transfers_remaining);
    //             // logger.info('> ' + inner_instruction);
    //             // logger.info('> ' + inner_instruction.index);
    //             // logger.info('> ' + index);
    //             //if (inner_instruction.index == index) transfers_remaining = 2;
    //             if (inner_instruction.index == 5) {
    //                 let nested_instructions = inner_instruction.instructions;
    //                 for (let nested_instruction of nested_instructions) {
    //                     if ("parsed" in nested_instruction) {
    //                         logger.info('parsed ' + nested_instruction.parsed.type);
    //                         if (nested_instruction.parsed.type == "transferChecked") {
    //                             logger.info(nested_instruction.parsed.info.tokenAmount.uiAmount);

    //                             //authority
    //                             //destination
    //                             //mint
    //                             //source
    //                         }
    //                         // logger.info('parsed ' + transfers_remaining);
    //                         // let tinfo = nested_instruction.parsed.info;
    //                         // logger.info(tinfo.tokenAmount);
    //                         //logger.info(tinfo.tokenAmount.uiAmount);
    //                         // if (transfers_remaining > 0 && nested_instruction.parsed.type == "transfer") {
    //                         //     transfers_remaining -= 1;
    //                         //     logger.info('xxx ');
    //                         //     logger.info(nested_instruction.parsed.info);
    //                         //     //swaps.push(nested_instruction.parsed.info);
    //                         // }
    //                     }
    //                     //if (this.isRaydiumSwap(nested_instruction, new PublicKey(pool_account))) transfers_remaining = 2;
    //                 }
    //             }
    //         }

    //         if (swaps.length == 0) return false;
    //         let swap1 = swaps[0];
    //         let swap2 = swaps[1];

    //         // const sender1 = new PublicKey(swap1.authority);
    //         // if (sender1 == RAYDIUM_AUTHORITY_V4) {
    //         //     [swap1, swap2] = [swap2, swap1];
    //         // }

    //         // let transaction: DecodedSwap = {
    //         //     blockTime: tx.blockTime,
    //         //     pool_address: pool_account,
    //         //     tx_signature: tx.transaction.signatures[0],
    //         //     type: 'buy',
    //         //     token_amount: '',
    //         //     sol_amount: '',
    //         //     account: swap1['authority'],
    //         // };
    //     }
    // }
    /////////////////////////

    //  let coder: RaydiumAmmCoder | null = null;
    //    coder = new RaydiumAmmCoder(RaydiumIDL as Idl);
    //     src/testdecode.ts:51:33 - error TS2352: Conversion of type '{ version: string; name: string; address: string; metadata: string; instructions: { name: string; accounts: { name: string; isMut: boolean; isSigner: boolean; }[]; args: ({ name: string; type: string; } | { ...; } | { ...; })[]; }[]; accounts: ({ ...; } | { ...; })[]; types: { ...; }[]; errors: { ...; }[]; }' to type 'Idl' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
    //   Types of property 'metadata' are incompatible.
    //     Type 'string' is not comparable to type 'IdlMetadata'.

    // 51     coder = new RaydiumAmmCoder(RaydiumIDL as Idl);

    // const rtx = await connection.getTransaction(txid, { commitment: commitment, maxSupportedTransactionVersion: 0 });
    // let vmsg = rtx?.transaction.message;
    // if (vmsg !== undefined) {
    //     parseTransactionAccounts(vmsg);
    // }
    //coder.decode(tx?.meta?.innerInstructions)

    //const result = this.coder!.accounts.decode('ammInfo', acc.data);

    //logger.info('idl ' + SolanaParser);
    //logger.info('idl ' + TestSolanaParser);

    //const result = this.coder!.accounts.decode('ammInfo', acc.data);

    //const txParser = new SolanaParser([{ idl: RaydiumIDL, programId: RAYDIUM_AMM_V4_PROGRAM_ID },]);
    //const txParser = new TestSolanaParser(Raydium, RAYDIUM_AMM_V4_PROGRAM_ID);

    // let transfers_remaining = 0;
    // let inner_instructions = tx?.meta?.innerInstructions;

    // let index = -1;
    // let swaps = [];
    // if (inner_instructions != null) {
    //     logger.info('AAAAAA');
    //     for (let inner_instruction of inner_instructions) {
    //         if (inner_instruction.index == index) transfers_remaining = 2;

    //         let nested_instructions = inner_instruction.instructions;
    //         for (let nested_instruction of nested_instructions) {
    //             if ("parsed" in nested_instruction) {
    //                 if (transfers_remaining > 0 && nested_instruction.parsed.type == "transfer") {
    //                     transfers_remaining -= 1;
    //                     logger.info('>?? ' + nested_instruction.parsed.info);
    //                     //swaps.push(nested_instruction.parsed.info);
    //                 }
    //             }
    //             //if (this.isRaydiumSwap(nested_instruction, new PublicKey(pool_account))) transfers_remaining = 2;
    //         }
    //     }
    // }
})();


//const { struct, u8, blob } = require('@solana/buffer-layout');

// //connection.getProgramAccounts(ammV4, {filters: [{memcmp: {offset: 368, bytes: tokenMint}]}) 
// //const rpcConnection = new Connection(process.env.SOLANA_RPC_ENDPOINT_2);
// let connection = new Connection(`${process.env.RPC_HOST}`);
// //console.log(raydiumIdl.instructions);
// let raydium = raydiumAmmProgram();
// console.log(raydium.idl.name);
// console.log(raydium.idl.version);
// console.log(raydium.idl.instructions[0]);

// const coder = new RaydiumAmmCoder(idl as Idl);
// const result = coder.instruction.decode(
//     Buffer.from("0bf70a9c01000000006417427900000000", "hex")
// );
// console.log(result);

//const txParser = new SolanaParser([{ idl: raydium.idl, programId: "CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK" }]);

// const parsed = await txParser.parseTransaction(
//     connection,
//     "3bSaEg71kkWDPtG94mn9bY8k2D7mABaqrQqL4F5JvzAEwukjqqwkjGhHBCb9fS5wVe1AG1J8i76ScKTZ59VGgJzt",
//     false,
// );

// console.log(parsed);

// const tokenSwapIx = parsed?.find((pix) => pix.name === "swap");

// console.log(tokenSwapIx);

