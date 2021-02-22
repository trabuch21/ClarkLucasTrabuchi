import { by, element, ElementFinder } from "protractor";
import { BasePage } from "./common/base-page";

class DoYouLikeClarkPage extends BasePage {
  readonly ja: ElementFinder;
  readonly nein: ElementFinder;
  readonly closePopUp: ElementFinder;
  constructor() {
    super();

    this.ja = element(by.css("button[data-test-button-appearance='primary']"));
    this.nein = element(
      by.css("button[data-test-button-appearance='secondary']")
    );
    this.closePopUp = element(by.css("button[class*='close-modal']"));
  }
}

export const doYouLikeClarkPage = new DoYouLikeClarkPage();
