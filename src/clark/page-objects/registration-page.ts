import { by, element, ElementFinder } from "protractor";
import { BasePage } from "./common/base-page";

class RegistrationPage extends BasePage {
  readonly email: ElementFinder;
  readonly password: ElementFinder;
  readonly joinNow: ElementFinder;
  constructor() {
    super();
    this.email = element(by.css("input[type='email']"));
    this.password = element(by.css("input[type='password']"));
    this.joinNow = element(by.css("button[type='submit']"));
  }

  register = async (email: string, password: string) => {
    await this.inputText(this.email, email);
    await this.inputText(this.password, "T1" + password);
    await this.click(this.joinNow);
  };
}

export const registrationPage = new RegistrationPage();
