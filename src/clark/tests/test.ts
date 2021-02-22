import { angebotePage } from "../page-objects/angebote-page";
import { homePage } from "../page-objects/home-page";
import { privathaftpflicht } from "../page-objects/pri­vat­haft­pflicht-page";
import fakeData from "../page-objects/fakeData.json";
import { registrationPage } from "../page-objects/registration-page";
import { offersPage } from "../page-objects/offers-page";
import { checkoutProfilePage } from "../page-objects/checkoutProfile-page";
import { summaryPage } from "../page-objects/summary-page";
import { awesomePage } from "../page-objects/awesome-page";
import { doYouLikeClarkPage } from "../page-objects/doYouLikeClark-page";
import { DriverProvider } from "protractor/built/driverProviders";
import { browser } from "protractor";

describe("", function() {
  const randomEmail =
    "lucas.trabuchi+" +
    Math.random()
      .toString(36)
      .substring(2, 11) +
    "@gmail.com";

  const randomPassword = Math.random()
    .toString(36)
    .slice(2);
  it("should behave...", async () => {
    await homePage.acceptCookieFn();
    await homePage.click(homePage.angebote);
    await angebotePage.click(angebotePage.privathaftpflicht);
    await privathaftpflicht.click(privathaftpflicht.weiter);
    await privathaftpflicht.click(privathaftpflicht.single);
    await privathaftpflicht.click(privathaftpflicht.ja);
    await privathaftpflicht.click(privathaftpflicht.jaBisZu);
    await privathaftpflicht.click(privathaftpflicht.weiterForm);
    await privathaftpflicht.click(privathaftpflicht.zumAngebot);
    await offersPage.click(offersPage.bestOption);

    await registrationPage.register(randomEmail, randomPassword);
    await checkoutProfilePage.setPersonalInformation(
      "Herr",
      fakeData.testData.name,
      fakeData.testData.lastName,
      fakeData.testData.birthdate,
      fakeData.testData.street,
      fakeData.testData.houseNumber,
      fakeData.testData.zipCode,
      fakeData.testData.city,
      fakeData.testData.phoneNumber
    );

    await checkoutProfilePage.setDesiredStartDate("nextWorkingDay");
    await checkoutProfilePage.setPreviousDamage("no");
    await checkoutProfilePage.setPaymentDetails(fakeData.testData.fakeIban);
    await summaryPage.validateSummaryPersonalInfo(
      "Herr",
      fakeData.testData.name + " " + fakeData.testData.lastName,
      fakeData.testData.street + " " + fakeData.testData.houseNumber,
      fakeData.testData.zipCode + " " + fakeData.testData.city,
      fakeData.testData.birthdate,
      randomEmail
    );

    await awesomePage.click(awesomePage.toTheContractView);

    await doYouLikeClarkPage.click(doYouLikeClarkPage.closePopUp);

    const currentURL = await browser.getCurrentUrl();
    expect(currentURL).toEqual("https://staging.clark.de/de/app/manager");
  });
});
