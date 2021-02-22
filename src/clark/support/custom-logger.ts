import { createLogger, format, transports } from 'winston';
import fse from 'fs-extra';
const { timestamp, prettyPrint, printf } = format;
const colorizer = format.colorize();

fse.remove('logger-bag/bender-logs/execution-logs.log', err => {
	if (err) return customLogger.logger.error(err);
});

class CustomLogger {
	public static myFormat = printf(msg =>
		colorizer.colorize(msg.level, `${msg.timestamp} - ${msg.level}: ${msg.message}`),
	);

	public static myFormatNoColor = printf(msg => `${msg.timestamp} - ${msg.level}: ${msg.message}`);

	logger = createLogger({
		transports: [
			//Write the logs into this file
			new transports.File({
				format: format.combine(timestamp(), prettyPrint(), CustomLogger.myFormatNoColor),
				filename: 'logger-bag/bender-logs/execution-logs.log',
			}),

			//Write the logs in the console.
			new transports.Console({
				format: format.combine(timestamp(), prettyPrint(), CustomLogger.myFormat),
			}),
		],
	});
}

export const customLogger = new CustomLogger();
