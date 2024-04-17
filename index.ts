import { logger } from './logger';
import { PoolMonitor } from './monitor'

(async () => {
    logger.info('start');
    try {
        let monitor = new PoolMonitor();
        monitor.init();
        //await subscribeToLPools();
        //await testinfo();
        // Additional code that relies on subscribeToLogsPool() can go here.
    } catch (error) {
        logger.error('An error occurred:', error);
    }
})();
logger.info('end');