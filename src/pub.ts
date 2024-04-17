import { connect, Connection, Channel, Options } from 'amqplib';
import { logger } from "./logger";

class RabbitMQPublisher {
    private connection: Connection | null = null;
    private channel: Channel | null = null;
    private readonly uri: string;
    private isConnecting: boolean = false;

    constructor(uri: string) {
        this.uri = uri;
    }

    async init(): Promise<void> {
        logger.info('RabbitMQPublisher. init rmq ' + this.uri);
        if (this.connection && this.channel) {
            return;
        }
        this.isConnecting = true;
        try {
            logger.info('connect ' + this.uri);
            this.connection = await connect(this.uri);
            this.connection.on('error', (err) => {
                logger.error('Connection error:', err);
                this.reconnect();
            });

            this.connection.on('close', () => {
                logger.info('Connection closed.');
                this.reconnect();
            });

            this.channel = await this.connection.createChannel();
            this.channel.on('open', () => {
                logger.info('success');
            });
            logger.info('Successfully connected to RabbitMQ');

        } catch (error) {
            logger.error('Failed to connect to RabbitMQ:', error);
            this.reconnect();
        } finally {
            //this.isConnecting = false;
            //logger.error('cant connect. ' + this.uri);
            //process.exit()
        }
    }

    async reconnect(): Promise<void> {
        this.close();
        console.log('Reconnecting...');
        setTimeout(() => this.init(), 5000); // Reconnect after 5 seconds
    }

    async publish(queue: string, message: string, options?: Options.Publish): Promise<boolean> {
        if (!this.channel) {
            throw new Error("Publisher not initialized. Call init() first.");
        }
        await this.channel.assertQueue(queue, {
            durable: false,
            autoDelete: true
        });
        return this.channel.sendToQueue(queue, Buffer.from(message), { ...options, persistent: false });
    }

    async publishFanout(exchange: string, message: string, options?: Options.Publish): Promise<void> {
        if (!this.channel) {
            throw new Error("Publisher not initialized. Call init() first.");
        }
        await this.channel.assertExchange(exchange, 'fanout', {
            durable: false,
            autoDelete: true
        });

        this.channel.publish(exchange, '', Buffer.from(message), { ...options, persistent: false });
    }

    async close(): Promise<void> {
        if (this.channel) {
            await this.channel.close();
            this.channel = null;
        }
        if (this.connection) {
            await this.connection.close();
            this.connection = null;
        }
    }
}


let uri = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`;
console.log(`connect ${uri}`);
export const rabbitMQPublisher = new RabbitMQPublisher(uri);
