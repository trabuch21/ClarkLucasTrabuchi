import { by, element, ElementFinder } from "protractor";
import { BasePage } from "./common/base-page";

class AwesomePage extends BasePage {
  readonly toTheContractView: ElementFinder;
  constructor() {
    super();
    this.toTheContractView = element(by.css("a[data-test-awesome-button]"));
  }
}

export const awesomePage = new AwesomePage();
