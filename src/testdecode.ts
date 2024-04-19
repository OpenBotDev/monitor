const { struct, u8, blob } = require('@solana/buffer-layout');

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

