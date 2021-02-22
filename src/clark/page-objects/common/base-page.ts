import assert from "assert";
/* eslint-disable-next-line */
import { browser, ElementFinder, element, Key, protractor } from "protractor";
import { async } from "q";
import { customLogger } from "../../support/custom-logger";
import { Helpers } from "../../support/helper";
import { LocatorManager } from "../../support/locator-manager";

export abstract class BasePage {
  click = async (element: ElementFinder): Promise<void> => {
    await Helpers.isClickableOrVisible(element);
    await Helpers.highlightElement(element);
    //browser.actions().mouseMove(element).click().perform();
    await element.click();

    const locator = await LocatorManager.showLocator(element);
    customLogger.logger.info(`The element: ${locator} was clicked`);
  };

  hoverOver = async (element: ElementFinder): Promise<void> => {
    await Helpers.highlightElement(element);
    await browser
      .actions()
      .mouseMove(element)
      .perform();

    const locator = await LocatorManager.showLocator(element);
    customLogger.logger.info(`This element was hovered: ${locator}`);
  };

  isChecked = async (element: ElementFinder): Promise<boolean> => {
    const locator = await LocatorManager.showLocator(element);

    if (expect(element.isSelected()).toBe(true)) {
      customLogger.logger.info(`This element is checked: ${locator}`);
      return true;
    } else {
      customLogger.logger.error(`This element is not checked: ${locator}`);
    }
  };

  isNotChecked = async (element: ElementFinder): Promise<boolean> => {
    const locator = await LocatorManager.showLocator(element);

    if (expect(element.isSelected()).toBe(false)) {
      customLogger.logger.info(`This element is not checked: ${locator}`);
      return true;
    } else {
      customLogger.logger.error(`This element is checked: ${locator}`);
    }
  };

  inputText = async (element: ElementFinder, text: any): Promise<void> => {
    await Helpers.isClickableOrVisible(element);
    await Helpers.highlightElement(element);
    await element.clear();
    await element.sendKeys(text);

    const locator = await LocatorManager.showLocator(element);
    customLogger.logger.info(`This text: '${text}' was sended to ${locator}`);
  };

  clearInput = async (element: ElementFinder) => {
    //await element.protractor.Key.COMMAND, 'a';
    //await element.protractor.Key.BACK_SPACE;

    await element.sendKeys(Key.chord(Key.COMMAND, "a"));
    await element.sendKeys(Key.DELETE);
  };

  getText = async (element: ElementFinder): Promise<string> => {
    await Helpers.highlightElement(element);
    const tagName = await element.getTagName();
    let text: string;
    const locator = await LocatorManager.showLocator(element);
    if (tagName === "input") {
      text = await element.getAttribute("value");
      customLogger.logger.info(
        `This text: '${text}' was obtained from locator: ${locator}`
      );
    } else {
      text = await element.getText();
      customLogger.logger.info(
        `This text: '${text}' was obtained from locator: ${locator}`
      );
    }
    return text;
  };

  assertText = async (
    actualText: string,
    expectedText: string
  ): Promise<void> => {
    const errorMessage = `Text Assertion ERROR\n\tActual text: ${actualText}\n\tExpected text: ${expectedText}`;
    assert.equal(actualText, expectedText, errorMessage);
  };

  isDisplayed = async (element: ElementFinder): Promise<boolean> => {
    const locator = await LocatorManager.showLocator(element);
    const isElementDisplayed = await Helpers.isElementInTheView(element).catch(
      (e) => {
        if (e) {
          return false;
        }
      }
    );

    if (isElementDisplayed === false) {
      customLogger.logger.info(`The element: ${locator} is not displayed`);
    } else {
      customLogger.logger.info(`The element: ${locator} is displayed`);
      await Helpers.highlightElement(element);
      return element.isDisplayed();
    }
  };

  isPresent = async (element: ElementFinder): Promise<boolean> => {
    const locator = await LocatorManager.showLocator(element);
    const isElementPresent = await Helpers.isElementInDOM(element).catch(
      (e) => {
        if (e) {
          return false;
        }
      }
    );

    if (isElementPresent === false) {
      customLogger.logger.info(`The element: ${locator} is not present`);
    } else {
      customLogger.logger.info(`The element: ${locator} is present`);
      await Helpers.highlightElement(element);
      return element.isPresent();
    }
  };

  refreshPage = async (): Promise<void> => {
    await browser.refresh();
  };

  isDisabled = async (element: ElementFinder): Promise<boolean> => {
    const locator = await LocatorManager.showLocator(element);
    if (this.isPresent(element)) {
      if (expect(element.getAttribute("disabled")).toEqual("true")) {
        customLogger.logger.error(`The element: ${locator} is disabled`);
        return true;
      } else {
        customLogger.logger.info(`The element: ${locator} is abled`);
        return false;
      }
    }
  };

  isEnabled = async (element: ElementFinder): Promise<boolean> => {
    const locator = await LocatorManager.showLocator(element);
    if (this.isPresent(element)) {
      if (expect(element.getAttribute("disabled")).toEqual("true")) {
        customLogger.logger.error(`The element: ${locator} is disabled`);
        return true;
      } else {
        customLogger.logger.info(`The element: ${locator} is abled`);
        return false;
      }
    }
  };

  getSiteTitle = async (): Promise<string> => browser.getTitle();

  goToUrl = async (url: string): Promise<void> => browser.get(url);

  getCurrentUrl = async (): Promise<string> => browser.getCurrentUrl();
}
