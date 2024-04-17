import { logger } from './logger';

(async () => {
    logger.info('start');
    try {
        //await subscribeToLPools();
        //await testinfo();
        // Additional code that relies on subscribeToLogsPool() can go here.
    } catch (error) {
        logger.error('An error occurred:', error);
    }
})();
logger.info('end');