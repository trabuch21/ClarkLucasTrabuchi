import { brown } from "color-name";
import { browser, by, element, ElementFinder } from "protractor";
import { async } from "q";
import { BasePage } from "./common/base-page";

class CheckoutProfilePage extends BasePage {
  // Deine Daten
  readonly male: ElementFinder;
  readonly female: ElementFinder;
  readonly price: ElementFinder;
  readonly firstName: ElementFinder;
  readonly lastName: ElementFinder;
  readonly birthDate: ElementFinder;
  readonly street: ElementFinder;
  readonly houseNumber: ElementFinder;
  readonly zipCode: ElementFinder;
  readonly city: ElementFinder;
  readonly phoneNumber: ElementFinder;
  readonly nextScreenProfile: ElementFinder;

  // Startdatum
  readonly nextWorkingDay: ElementFinder;
  readonly laterChoice: ElementFinder;
  readonly noDamage: ElementFinder;
  readonly insuranceStartDate: ElementFinder;
  readonly noPreviousDamage: ElementFinder;
  readonly yesPreviousDamage: ElementFinder;
  readonly damageInfo: ElementFinder;
  readonly nextStartDate: ElementFinder;

  // Zahlungsdaten
  readonly iban: ElementFinder;
  readonly consent: ElementFinder;
  readonly nextPaymentDetails: ElementFinder;

  constructor() {
    super();
    this.price = element(by.css("p[data-test-price]"));
    this.male = element(
      by.css("li[class='cucumber-profile-customer-gender-male']")
    );
    this.female = element(
      by.xpath("//*[@value='female']/following-sibling::span[1]")
    );
    this.firstName = element(by.css("input[name='firstName']"));
    this.lastName = element(by.css("input[name='lastName']"));
    this.birthDate = element(by.css("input[name='birthdate']"));
    this.street = element(by.css("input[name='street']"));
    this.houseNumber = element(by.css("input[name='houseNumber']"));
    this.zipCode = element(by.css("input[name='zipcode']"));
    this.city = element(by.css("input[name='city']"));
    this.phoneNumber = element(by.css("input[name='phoneNumber']"));

    // Startdatum
    this.nextWorkingDay = element(
      by.css("li[class*='next-working-day-choice']")
    );
    this.noDamage = element(by.css("li[class*='previous-damage-no-choice']"));
    this.nextScreenProfile = element(
      by.css("button[data-test-checkout-screen-profile-continue]")
    );
    this.laterChoice = element(by.css("li[class*='later-choice']"));
    this.insuranceStartDate = element(
      by.css("input[class*='insurance-start-date']")
    );
    this.noPreviousDamage = element(
      by.css("li[class*='previous-damage-no-choice']")
    );

    this.yesPreviousDamage = element(
      by.css("li[class*='previous-damage-yes-choice']")
    );
    this.damageInfo = element(
      by.css("textarea[class*='previous-damage-text-field']")
    );

    this.nextStartDate = element(
      by.css("button[data-test-start-date-form-continue-button]")
    );

    // Zahlungsdaten
    this.iban = element(by.css("input[name='iban']"));
    this.consent = element(by.css("span[data-test-checkbox-primitive]"));
    this.nextPaymentDetails = element(
      by.css("button[data-test-payment-details-form-continue-button]")
    );
  }

  setPersonalInformation = async (
    gender: string,
    name: string,
    lastName: string,
    birthDate: string,
    street: string,
    houseNumber: string,
    zipCode: string,
    city: string,
    phoneNumber: string
  ) => {
    await browser.sleep(5000);
    if (gender === "Herr") {
      await this.click(this.male);
    } else if (gender === "Frau") {
      await this.click(this.female);
    }
    await this.inputText(this.firstName, name);
    await this.inputText(this.lastName, lastName);
    await this.inputText(this.birthDate, birthDate);
    await this.inputText(this.street, street);
    await this.inputText(this.houseNumber, houseNumber);
    await this.inputText(this.zipCode, zipCode);
    await this.inputText(this.city, city);
    await this.inputText(this.phoneNumber, phoneNumber);
    await this.click(this.nextScreenProfile);
  };

  setDesiredStartDate = async (when: string, startDate?: string) => {
    if (when === "nextWorkingDay") {
      await this.click(this.nextWorkingDay);
    } else if (when === "later") {
      await this.inputText(this.insuranceStartDate, startDate);
    }
  };

  setPreviousDamage = async (anyClaimLast5Years: string, info?: string) => {
    if (anyClaimLast5Years === "yes") {
      await this.inputText(this.damageInfo, info);
    } else if (anyClaimLast5Years === "no") {
      await this.click(this.noPreviousDamage);
    }
    await this.click(this.nextStartDate);
  };

  setPaymentDetails = async (iban: string) => {
    await this.inputText(this.iban, iban);
    await this.click(this.consent);
    await this.click(this.nextPaymentDetails);
  };
}

export const checkoutProfilePage = new CheckoutProfilePage();
