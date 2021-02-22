import M from "minimatch";
import { by, element, ElementFinder } from "protractor";
import { async } from "q";
import { BasePage } from "./common/base-page";

class Privathaftpflicht extends BasePage {
  readonly weiter: ElementFinder;

  readonly title: ElementFinder;

  // Wen möchtest du versichern?
  readonly single: ElementFinder;
  readonly familieMitKindern: ElementFinder;
  readonly paarOhneKind: ElementFinder;
  readonly singleMitKindern: ElementFinder;

  // common
  readonly weiterForm: ElementFinder;
  readonly abbrechen: ElementFinder;
  readonly ja: ElementFinder;
  readonly nein: ElementFinder;
  readonly jaBisZu: ElementFinder;
  readonly zuruck: ElementFinder;

  /// Finish
  readonly zumAngebot: ElementFinder;

  constructor() {
    super();
    this.weiter = element(by.css("button[class*='continue']"));
    this.title = element(by.id("headline"));
    this.single = element(
      by.xpath("//*[@id='Single']/following-sibling::span")
    );
    this.familieMitKindern = element(
      by.xpath("//*[@id='Familie mit Kindern']/following-sibling::span")
    );
    this.paarOhneKind = element(
      by.xpath("//*[@id='Paar ohne Kind']/following-sibling::span")
    );
    this.singleMitKindern = element(
      by.xpath("//*[@id='Single mit Kindern']/following-sibling::span")
    );
    this.ja = element(by.xpath("//*[@id='Ja']/following-sibling::span"));
    this.nein = element(by.xpath("//*[@id='radioButtonsSingleSelect']/li[2]"));
    this.jaBisZu = element(
      by.xpath("//*[@id='Ja, bis zu 150 Euro']/following-sibling::span")
    );

    this.zuruck = element(by.css("[class*='btn-back']"));
    this.abbrechen = element(by.css("[class*='btn-back']"));
    this.weiterForm = element(by.css("[class*='btn-next']"));
    this.zumAngebot = element(by.xpath("//a//span/span"));
  }
}

export const privathaftpflicht = new Privathaftpflicht();
