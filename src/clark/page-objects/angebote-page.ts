import { by, element, ElementFinder } from "protractor";
import { BasePage } from "./common/base-page";

class AngebotePage extends BasePage {
  readonly privathaftpflicht: ElementFinder;

  constructor() {
    super();
    this.privathaftpflicht = element(
      by.css(
        "div[data-cucumber-offers-selection-popular-option='Privathaftpflicht']"
      )
    );
  }
}

export const angebotePage = new AngebotePage();
