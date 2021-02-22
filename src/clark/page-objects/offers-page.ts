import { by, element, ElementFinder } from "protractor";
import { BasePage } from "./common/base-page";

class OffersPage extends BasePage {
  readonly bestOption: ElementFinder;
  constructor() {
    super();
    this.bestOption = element(
      by.css("button[data-test-button-appearance='primary']")
    );
  }
}

export const offersPage = new OffersPage();
