import { by, element, expect } from 'detox';
import { reloadApp } from "detox-expo-helpers";

describe('Swipe pages', () => {
    beforeAll(async () => {
        await reloadApp();
    });

    it('default', async () => {
        await expect(element(by.id('container-top'))).toBeVisible();
        await expect(element(by.id('container-count'))).toBeNotVisible();
        await expect(element(by.id('container-saved'))).toBeNotVisible();
    });

    it('top => count', async () => {
        await element(by.id('container-top')).swipe('left');
        await expect(element(by.id('container-top'))).toBeNotVisible();
        await expect(element(by.id('container-count'))).toBeVisible();
        await expect(element(by.id('container-saved'))).toBeNotVisible();
    });

    it('count => saved', async () => {
        await element(by.id('container-count')).swipe('up');
        await expect(element(by.id('container-top'))).toBeNotVisible();
        await expect(element(by.id('container-count'))).toBeNotVisible();
        await expect(element(by.id('container-saved'))).toBeVisible();
    });

    it('saved => count', async () => {
        await element(by.id('container-saved')).swipe('down');
        await expect(element(by.id('container-top'))).toBeNotVisible();
        await expect(element(by.id('container-count'))).toBeVisible();
        await expect(element(by.id('container-saved'))).toBeNotVisible();
    });

    it('count => top', async () => {
        await element(by.id('container-count')).swipe('right');
        await expect(element(by.id('container-top'))).toBeVisible();
        await expect(element(by.id('container-count'))).toBeNotVisible();
        await expect(element(by.id('container-saved'))).toBeNotVisible();
    });
});
