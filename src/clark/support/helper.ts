/* eslint-disable-next-line */
import { browser, ExpectedConditions as EC, ElementFinder } from "protractor";
import { LocatorManager } from "./locator-manager";

export abstract class Helpers {
  /**
   * Global values:
   * Waiting time, defined per project. Elements that are not found during this time will be exceptions.
   * Error message, message that will be displayed as custom exception if the element is not available.
   * Milliseconds will be converted into seconds in order to be more human readable.
   */
  static globalElementValues = {
    waitingTime: 10000, // 10 seconds
    errorMessage: (locator: string) =>
      `No element found using locator: ${locator}\n`,
  };

  /**
   * Wait until the element is clickable or visible
   * @param element: Element that you want to wait until is clickable or visible
   */
  static isClickableOrVisible = async (
    element: ElementFinder
  ): Promise<void> => {
    const locator = await LocatorManager.showLocator(element);
    await browser.wait(
      EC.elementToBeClickable(element) || EC.visibilityOf(element),
      Helpers.globalElementValues.waitingTime,
      Helpers.globalElementValues.errorMessage(locator)
    );
  };

  /**
   * Wait for the element's existence in the View
   * @param element: Element that you want to wait until exists in the View
   */
  static isElementInTheView = async (element: ElementFinder): Promise<void> => {
    const locator = await LocatorManager.showLocator(element);
    await browser.wait(
      EC.visibilityOf(element),
      Helpers.globalElementValues.waitingTime,
      Helpers.globalElementValues.errorMessage(locator)
    );
  };

  /**
   * Wait for the element's existence in the DOM
   * @param element: Element that you want to wait until exists in the DOM
   */
  static isElementInDOM = async (element: ElementFinder): Promise<void> => {
    const locator = await LocatorManager.showLocator(element);
    await browser.wait(
      EC.presenceOf(element),
      Helpers.globalElementValues.waitingTime,
      Helpers.globalElementValues.errorMessage(locator)
    );
  };

  /**
   * Highlight the element that protractor interacts with UI during execution
   * @param element: Element that you want to be highlighted
   */
  static highlightElement = async (element: ElementFinder): Promise<void> => {
    const locator = await LocatorManager.showLocator(element);
    await browser.wait(
      EC.presenceOf(element),
      Helpers.globalElementValues.waitingTime,
      Helpers.globalElementValues.errorMessage(locator)
    );
    const setStyle = (element: ElementFinder, style: string): void => {
      const previous = element.getAttribute("style");
      element.setAttribute("style", style);
      setTimeout(() => {
        element.setAttribute("style", previous);
      }, 200);
    };
    await browser.executeScript(
      setStyle,
      element.getWebElement(),
      "color: red; background-color: yellow;"
    );
  };
}
