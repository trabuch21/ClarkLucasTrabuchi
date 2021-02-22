import { by, element, ElementFinder } from "protractor";
import { BasePage } from "./common/base-page";

class SummaryPage extends BasePage {
  readonly gender: ElementFinder;
  readonly name: ElementFinder;
  readonly streetAndHouseNumber: ElementFinder;
  readonly zipCodeAndCity: ElementFinder;
  readonly birthdate: ElementFinder;
  readonly email: ElementFinder;
  readonly telephone: ElementFinder;

  readonly finish: ElementFinder;

  constructor() {
    super();
    this.gender = element(
      by.css(
        "dl[data-test-summary-profile-fields] [data-test-summary-field-value='0']"
      )
    );
    this.name = element(
      by.css(
        "dl[data-test-summary-profile-fields] [data-test-summary-field-value='1']"
      )
    );
    this.streetAndHouseNumber = element(
      by.css(
        "dl[data-test-summary-profile-fields] [data-test-summary-field-value='2']"
      )
    );
    this.zipCodeAndCity = element(
      by.css(
        "dl[data-test-summary-profile-fields] [data-test-summary-field-value='3']"
      )
    );
    this.birthdate = element(
      by.css(
        "dl[data-test-summary-profile-fields] [data-test-summary-field-value='4']"
      )
    );
    this.email = element(
      by.css(
        "dl[data-test-summary-profile-fields] [data-test-summary-field-value='5']"
      )
    );
    this.telephone = element(
      by.css(
        "dl[data-test-summary-profile-fields] [data-test-summary-field-value='6']"
      )
    );

    this.finish = element(by.css("button[data-test-summary-continue-button]"));
  }

  validateSummaryPersonalInfo = async (
    gender: string,
    name: string,
    streetAndHouseNumber: string,
    zipCodeAndCity: string,
    birthdate: string,
    email: string
  ) => {
    expect(await this.getText(this.gender)).toEqual(gender);
    expect(await this.getText(this.name)).toEqual(name);
    expect(await this.getText(this.streetAndHouseNumber)).toEqual(
      streetAndHouseNumber
    );
    expect(await this.getText(this.zipCodeAndCity)).toEqual(zipCodeAndCity);
    expect(await this.getText(this.birthdate)).toEqual(birthdate);
    expect(await this.getText(this.email)).toEqual(email);
    await this.click(this.finish);
  };
}

export const summaryPage = new SummaryPage();
