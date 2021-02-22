/* eslint-disable-next-line */
import {
  BrowserUtilities,
  PluginUtilities,
  ScreenshotsUtilities,
} from "./clark/utilities/config-utilities";
/* eslint-disable-next-line */
import { browser, Config } from "protractor";
import { customLogger } from "./clark/support/custom-logger";
import fse from "fs-extra";
const SpecReporter = require("jasmine-spec-reporter").SpecReporter;
const AllureReporter = require("jasmine-allure-reporter");
declare const allure: any;

export const config: Config = {
  seleniumServerStartTimeout: 30000,
  framework: "jasmine2",
  //directConnect: true,
  baseUrl: "https://staging.clark.de/de/app/contracts?cv=2",
  SELENIUM_PROMISE_MANAGER: false,

  /***
	Protractor waits for the page to be loaded and
	the new URL to appear before continuing.
	***/
  getPageTimeout: 30000, //30 seconds

  /***
	Sets the amount of time to wait for an asynchronous script
	to finish execution before throwing an error.
	***/
  allScriptsTimeout: 30000, //30 seconds

  jasmineNodeOpts: {
    /***
		If a spec (an 'it' block) takes longer than the Jasmine timeout for any reason, it will fail.
		***/
    defaultTimeoutInterval: 3600000, //360 seconds
  },

  multiCapabilities: BrowserUtilities.multiCapabilitiesConfigs,

  suites: {
    clarkTest: ["./clark/tests/test.js"],
  },

  plugins: PluginUtilities.pluginConfig,

  onPrepare: async () => {
    jasmine.getEnv().addReporter(
      new SpecReporter({
        suite: {
          displayNumber: true,
        },
        spec: {
          displayFailed: true,
          displaySuccess: true,
          displayDuration: true,
        },
        summary: {
          displayPending: true,
          displayDuration: true,
        },
      })
    );

    const dirPathsToClean = [
      "logger-bag/allure-output",
      "logger-bag/allure-report",
      "logger-bag/screenshots-for-failures/",
    ];

    dirPathsToClean.forEach((path) => {
      fse.emptyDir(path, (err) => {
        if (err) return customLogger.logger.error(err);
      });
    });

    jasmine.getEnv().addReporter(
      new AllureReporter({
        resultsDir: "logger-bag/allure-report",
      })
    );

    jasmine.getEnv().afterEach(function(done) {
      browser.takeScreenshot().then(function(png) {
        allure.createAttachment(
          "Screenshot",
          function() {
            return new Buffer(png, "base64");
          },
          "image/png"
        );
        done();
      });
    });

    jasmine.getEnv().addReporter({
      specStarted: async (result) => {
        customLogger.logger.info(
          `\n • Current test running: \n\t • ${(exports.config.multiCapabilities.name =
            result.fullName)}\n`
        );
      },

      specDone: async (result) => {
        if (result.status === "failed") {
          await ScreenshotsUtilities.takeScrenshootInFailure(result);
        }
      },
    });

    jasmine.getEnv().afterEach(function(done) {
      browser.takeScreenshot().then(function(png) {
        allure.createAttachment(
          "Screenshot",
          function() {
            return new Buffer(png, "base64");
          },
          "image/png"
        )();
        done();
      });
    });

    beforeAll(async () => {
      /***
			Default number of milliseconds Jasmine will wait for an asynchronous spec to complete.
			***/
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 12360000; //120 seconds
    });

    beforeEach(async () => {
      await BrowserUtilities.startBrowser();
    });

    afterEach(async () => {
      const browserCapabilities = await browser.getCapabilities();
      const browserName = await browserCapabilities.get("browserName");
      if (browserName === "chrome") {
        await BrowserUtilities.showBrowserLogs();
      }
    });
  },

  params: {
    onComplete: async (success) => {
      await BrowserUtilities.killBrowser();
      if (!success) {
        process.exit(1);
      }
    },
  },
};
