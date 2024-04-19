import 'dotenv/config';
import { logger } from './logger';
import { Connection, PublicKey, Finality } from '@solana/web3.js';
import * as fs from 'fs/promises';


let rpc = process.env.RPC_HOST;
//let wss = process.env.WSS_HOST!;
logger.info("init connection " + `${rpc}`);
let connection = new Connection(`${process.env.RPC_HOST}`);


(async () => {
    logger.info('start.');
    //let txid = '3bSaEg71kkWDPtG94mn9bY8k2D7mABaqrQqL4F5JvzAEwukjqqwkjGhHBCb9fS5wVe1AG1J8i76ScKTZ59VGgJzt';
    let txid = '2xcJTe8SUbsZftcdMNwXcaHs1LNWrvKWUqjoKJJ8Z5Bt8KvymXs5zmrzHZLs6QSeoLJFFSJBEiQcNQvrQKgoL8ye';
    let commitment: Finality = "confirmed";
    //const tx = await connection.getTransaction(txid, { commitment: commitment, maxSupportedTransactionVersion: 0 });
    const tx = await connection.getParsedTransaction(txid, { commitment: commitment, maxSupportedTransactionVersion: 0 });
    try {
        const txJson = JSON.stringify(tx, null, 2); // The '2' argument for pretty formatting
        await fs.writeFile('tx.json', txJson, 'utf8');
    } catch (error) {

    }
    logger.info('tx ' + tx);
    logger.info('tx ' + tx?.meta?.logMessages);
    logger.info('tx ' + tx?.transaction.message.instructions);

    let transfers_remaining = 0;
    let inner_instructions = tx?.meta?.innerInstructions;

    let index = -1;
    let swaps = [];
    if (inner_instructions != null) {
        logger.info('AAAAAA');
        for (let inner_instruction of inner_instructions) {
            if (inner_instruction.index == index) transfers_remaining = 2;

            let nested_instructions = inner_instruction.instructions;
            for (let nested_instruction of nested_instructions) {
                if ("parsed" in nested_instruction) {
                    if (transfers_remaining > 0 && nested_instruction.parsed.type == "transfer") {
                        transfers_remaining -= 1;
                        logger.info('>?? ' + nested_instruction.parsed.info);
                        //swaps.push(nested_instruction.parsed.info);
                    }
                }
                //if (this.isRaydiumSwap(nested_instruction, new PublicKey(pool_account))) transfers_remaining = 2;
            }
        }
    }
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

