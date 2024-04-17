
import 'dotenv/config';

import { logger } from "./logger";
import { Connection, PublicKey } from '@solana/web3.js';
//TODO
//const IDL = require('../raydium_idl/idl.json');
import { MAINNET_PROGRAM_ID } from '@raydium-io/raydium-sdk';
//import { rabbitMQPublisher } from './pub.js';
//import { rabbitMQSubscriber } from '../lib/pubsub/subscriber.js';
//import { RaydiumAmmCoder } from '../raydium_idl/coder/index.js';
import { BN } from 'bn.js';
import { Idl } from "@coral-xyz/anchor";

export const RAYDIUM_LIQUIDITY_PROGRAM_ID_V4 = MAINNET_PROGRAM_ID.AmmV4;

export const RAY_FEE = new PublicKey(
    '7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5'
);

logger.info(`connect ${process.env.RPC_HOST} ${process.env.WSS_HOST}`)

//import { PoolModel, PoolCreationTx } from '../examples/types.js'

// const io = require('@pm2/io')

// //testing
// const realtimeUser = io.metric({
//     name: 'Realtime user',
// })

// realtimeUser.set(42)

// const pm2pools = io.meter({
//     name: 'pools',
//     id: 'pools'
// })

/**
 * monitor pools
 */
export class PoolMonitor {

    private static instance: PoolMonitor | null = null;
    private connection: Connection | null = null;
    private isInitiated: boolean = false;
    //private coder: RaydiumAmmCoder | null = null;


    /**
     * Initializes a new instance of the PoolMonitor class.
     * Private constructor to enforce singleton pattern.
     */
    public constructor() {
        logger.info("init connection " + `${process.env.RPC_HOST}`);
        this.connection = new Connection(`${process.env.RPC_HOST}`, { wsEndpoint: `${process.env.WSS_HOST}` });
        //this.coder = new RaydiumAmmCoder(IDL as Idl);
    }

    /**
     * Initializes the PoolMonitor by subscribing to logs.
     */
    public async init() {
        if (!this.connection) return;

        try {
            // Optionally, to get more details about the block, you can use the getBlock method
            //const blockheight = await this.connection.getBlockHeight();
            const currentSlot = await this.connection.getSlot();

            //logger.info('getBlockHeight:' + blockheight);
            logger.info('currentSlot:' + currentSlot);

        } catch (error) {
            logger.error('Failed to fetch the blockheight');
            console.log(error);
        }


    }

}