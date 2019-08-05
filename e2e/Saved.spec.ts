import { by, element, expect } from 'detox';
import { reloadApp } from "detox-expo-helpers";

describe('Saved', () => {
    beforeAll(async () => {
        await reloadApp();
        await element(by.id("time")).tap();
        await element(by.id("time")).replaceText("5");
        await element(by.id("container-top")).tap();
        await element(by.id('container-top')).swipe('left');
    });

    it('tap and save page', async () => {
        await element(by.id('container-count')).swipe('up');
        await expect(element(by.label("1").withAncestor(by.id("container-saved")))).toNotExist();
        await element(by.id('container-saved')).swipe('down');
        await element(by.id("tap-save")).tap();
        await element(by.id('container-count')).swipe('up');
        await expect(element(by.label("1").withAncestor(by.id("container-saved")))).toExist();
    });

    it('tap again and nothing happens', async () => {
        await element(by.id('container-saved')).swipe('down');
        await element(by.id("tap-save")).tap();
        await element(by.id('container-count')).swipe('up');
        await expect(element(by.label("1").withAncestor(by.id("container-saved")))).toExist();
    });

    it('skip page and save', async () => {
        await element(by.id('container-saved')).swipe('down');
        await element(by.id("tap-skip")).tap();
        await element(by.id("tap-save")).tap();
        await element(by.id("tap-skip")).tap();
        await element(by.id("tap-save")).tap();
        await element(by.id("tap-skip")).tap();
        await element(by.id("tap-save")).tap();
        await element(by.id('container-count')).swipe('up');
        await expect(element(by.label("1").withAncestor(by.id("container-saved")))).toExist();
        await expect(element(by.label("2").withAncestor(by.id("container-saved")))).toExist();
        await expect(element(by.label("3").withAncestor(by.id("container-saved")))).toExist();
        await expect(element(by.label("4").withAncestor(by.id("container-saved")))).toExist();
    });

    it('can save when counting', async () => {
        await element(by.id('container-saved')).swipe('down');
        await element(by.id("tap-reading")).tap();
        await waitFor(element(by.id("current-page"))).toHaveText("P. 5").withTimeout(1000);
        await element(by.id("tap-save")).tap();
        await element(by.id('container-count')).swipe('up');
        await expect(element(by.label("1").withAncestor(by.id("container-saved")))).toExist();
        await expect(element(by.label("2").withAncestor(by.id("container-saved")))).toExist();
        await expect(element(by.label("3").withAncestor(by.id("container-saved")))).toExist();
        await expect(element(by.label("4").withAncestor(by.id("container-saved")))).toExist();
        await expect(element(by.label("5").withAncestor(by.id("container-saved")))).toExist();
    });

    it('saved page consists when traversing pages', async () => {
        await element(by.id('container-saved')).swipe('down');
        await element(by.id('container-count')).swipe('right');
        await element(by.id('container-top')).swipe('left');
        await element(by.id('container-count')).swipe('up');
        await expect(element(by.label("1").withAncestor(by.id("container-saved")))).toExist();
        await expect(element(by.label("2").withAncestor(by.id("container-saved")))).toExist();
        await expect(element(by.label("3").withAncestor(by.id("container-saved")))).toExist();
        await expect(element(by.label("4").withAncestor(by.id("container-saved")))).toExist();
        await expect(element(by.label("5").withAncestor(by.id("container-saved")))).toExist();
    });

    it('resets saved page config has changed', async () => {
        await element(by.id('container-saved')).swipe('down');
        await element(by.id('container-count')).swipe('right');
        await element(by.id("page-from")).tap();
        await element(by.id("page-from")).replaceText("10");
        await element(by.id("page-to")).tap();
        await element(by.id("page-to")).replaceText("370");
        await element(by.id('container-top')).swipe('left');
        await element(by.id('container-count')).swipe('up');
        await expect(element(by.label("1").withAncestor(by.id("container-saved")))).toNotExist();
        await expect(element(by.label("2").withAncestor(by.id("container-saved")))).toNotExist();
        await expect(element(by.label("3").withAncestor(by.id("container-saved")))).toNotExist();
        await expect(element(by.label("4").withAncestor(by.id("container-saved")))).toNotExist();
        await expect(element(by.label("5").withAncestor(by.id("container-saved")))).toNotExist();
    });
});