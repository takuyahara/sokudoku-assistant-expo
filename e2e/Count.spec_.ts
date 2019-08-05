import { by, element, expect } from 'detox';
import { reloadApp } from "detox-expo-helpers";

describe('Count', () => {
    describe('Tap button', () => {
        beforeAll(async () => {
            await reloadApp();
            await element(by.id("time")).tap();
            await element(by.id("time")).replaceText("5");
            await element(by.id("container-top")).tap();
            await element(by.id('container-top')).swipe('left');
        });

        it('tap and start counting', async () => {
            await expect(element(by.id("current-page"))).toHaveLabel("P. 1");
            await element(by.id("tap-reading")).tap();
            await waitFor(element(by.id("current-page"))).toHaveText("P. 2").withTimeout(1000);
            await expect(element(by.id("current-page"))).toHaveLabel("P. 2");
        });

        it('tap and pause counting', async () => {
            await element(by.id("tap-reading")).tap();
            await waitFor(element(by.id("current-page"))).toHaveText("dummy").withTimeout(1000);
            await expect(element(by.id("current-page"))).toHaveLabel("P. 2");
        });

        it('tap and resume counting', async () => {
            await element(by.id("tap-reading")).tap();
            await waitFor(element(by.id("current-page"))).toHaveText("P. 3").withTimeout(1000);
            await expect(element(by.id("current-page"))).toHaveLabel("P. 3");
        });

        it('reset counting when completed', async () => {
            await reloadApp();
            await element(by.id("page-to")).tap();
            await element(by.id("page-to")).replaceText("10");
            await element(by.id("time")).tap();
            await element(by.id("time")).replaceText("1");
            await element(by.id("container-top")).tap();
            await element(by.id('container-top')).swipe('left');
            for (let i = 0; i < 9; i++) {
                await element(by.id("tap-skip")).tap();
            }
            await expect(element(by.id("current-page"))).toHaveLabel("P. 10");

            await element(by.id("tap-reading")).tap();
            await waitFor(element(by.id("current-page"))).toHaveText("P. 1").withTimeout(6000 + 1000);
            await expect(element(by.id("current-page"))).toHaveLabel("P. 1");

            // verify that counting is not running
            await waitFor(element(by.id("current-page"))).toHaveText("dummy").withTimeout(6000 + 1000);
            await expect(element(by.id("current-page"))).toHaveLabel("P. 1");
        });
    });

    describe('Skip button', () => {
        beforeAll(async () => {
            await reloadApp();
            await element(by.id("time")).tap();
            await element(by.id("time")).replaceText("5");
            await element(by.id("container-top")).tap();
            await element(by.id('container-top')).swipe('left');
        });

        it('tap and increment page', async () => {
            await expect(element(by.id("current-page"))).toHaveLabel("P. 1");
            await element(by.id("tap-skip")).tap();
            await waitFor(element(by.id("current-page"))).toHaveText("P. 2").withTimeout(1000);
            await expect(element(by.id("current-page"))).toHaveLabel("P. 2");

            // verify that counting is not running
            await waitFor(element(by.id("current-page"))).toHaveText("dummy").withTimeout(1000);
            await expect(element(by.id("current-page"))).toHaveLabel("P. 2");
        });

        it('tap when counting', async () => {
            await element(by.id("tap-reading")).tap();
            await element(by.id("tap-skip")).tap();
            await expect(element(by.id("current-page"))).toHaveLabel("P. 3");

            // verify that counting is still running
            await waitFor(element(by.id("current-page"))).toHaveText("P. 4").withTimeout(1000);
            await expect(element(by.id("current-page"))).toHaveLabel("P. 4");
        });

        it('counting is reset when swiped to Top', async () => {
            await element(by.id('container-count')).swipe('right');
            await element(by.id('container-top')).swipe('left');
            await expect(element(by.id("current-page"))).toHaveLabel("P. 1");

            // verify that counting is not running
            await waitFor(element(by.id("current-page"))).toHaveText("dummy").withTimeout(1000);
            await expect(element(by.id("current-page"))).toHaveLabel("P. 1");
        });
    });
});