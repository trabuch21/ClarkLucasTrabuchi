import { by, element, ElementFinder } from "protractor";
import { BasePage } from "./common/base-page";

class HomePage extends BasePage {
  readonly angebote: ElementFinder;
  readonly closePopUp: ElementFinder;

  constructor() {
    super();
    this.angebote = element(by.css("[href*='request']"));
    this.closePopUp = element(by.css("[class*='close-btn']"));
  }

  acceptCookieFn = async () => {
    await this.click(this.closePopUp);
  };
}
export const homePage = new HomePage();
