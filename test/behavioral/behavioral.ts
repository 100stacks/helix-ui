import {$, Snappit, IConfig, WebDriver, By} from "snappit-visual-regression";

import * as util from "../common/util";
import tabTest from "./tests/tabs";
import {test} from "ava";

export function suite(browserName: string) {
    let snappit: Snappit;
    let driver: WebDriver;
    test.before(async () => {
        const config: IConfig = {
            browser: browserName,
            headless: true,
            initialViewportSize: [1366, 768],
        };

        snappit = new Snappit(config);
        driver = await snappit.start();
        await driver.get(util.baseUrl);
    });

    test("nav", async testExecutionObject => {
        const expected = [
            "GUIDES",
            "COMPONENTS",
            "CUSTOM ELEMENTS"
        ];
        const elements = await driver.findElements(By.css("hx-disclosure"));
        const text = await util.getElementsText(elements);
        testExecutionObject.deepEqual(text, expected);
    });

    test("nav/guides", async testExecutionObject => {
        const expected = [
            "Getting Started",
            "FAQ",
            "React Compatibility",
            "Polyfills"
        ];
        await driver.findElement(By.css("hx-disclosure")).click();
        const reveal = await driver.findElement(By.id("nav-Guides"));
        const links = await reveal.findElements(By.tagName('a'));
        const text = await util.getElementsText(links);
        testExecutionObject.deepEqual(text, expected);
    });

     /**
      * This is here because of https://github.com/SeleniumHQ/selenium/issues/3882
      * For the mean time, don't attempt to use keyboard navigation (in tabs) when
      * testing with Firefox. Chrome works just fine, however.
      */
    if (browserName === "chrome") {
        test("tabs/first", async testExecutionObject => {
            await util.go(driver, "components/tabs");
            await tabTest(testExecutionObject, driver, "android-desserts-tab-0", "Cupcake Ipsum");
        });

        test("tabs/second", async testExecutionObject => {
            await tabTest(testExecutionObject, driver, "marshmallow", "Biscuit Marshmallow");
        });

        test("tabs/third", async testExecutionObject => {
            await tabTest(testExecutionObject, driver, "android-desserts-tab-2", "Caramels Marzipan");
        });
    }

    test.after.always(async () => {
        await snappit.stop();
    });
}
