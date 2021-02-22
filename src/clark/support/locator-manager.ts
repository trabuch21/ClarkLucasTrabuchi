/* eslint-disable-next-line */
import { customLogger } from "./custom-logger";
/* eslint-disable-next-line */
import { ElementFinder } from "protractor";

export abstract class LocatorManager {
	/**
	 * Will get the current locator as a string from the ElementFinder object
	 * @param element: ElementFinder that you are using
	 *
	 */
	static showLocator = async (element: ElementFinder): Promise<string> => {
		const locatorTypes = {
			css: 'By(css selector,',
			xpath: 'By(xpath,',
		};
		try {
			let locator: string;
			const entireLocator = await element.locator().toString();
			if (entireLocator.includes(locatorTypes.css)) {
				const firstPartRemoved = entireLocator.replace(locatorTypes.css, '');
				locator = firstPartRemoved.substring(firstPartRemoved.length - 1, '');
			} else if (entireLocator.includes(locatorTypes.xpath)) {
				const firstPartRemoved = entireLocator.replace(locatorTypes.xpath, '');
				locator = firstPartRemoved.substring(firstPartRemoved.length - 1, '');
			}
			return locator;
		} catch (err) {
			customLogger.logger.error(`An error happened:\n\t ${err}`);
		}
	};
}
