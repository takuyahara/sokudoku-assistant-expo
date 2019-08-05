import { by, element, expect } from 'detox';
import { reloadApp } from "detox-expo-helpers";

describe('Top', () => {
    beforeAll(async () => {
        await reloadApp();
    });

    describe('pageFrom', () => {
        it('should calculate sec/page when changed', async () => {
            await element(by.id("page-from")).tap();
            await element(by.id("page-from")).replaceText("30");
            await element(by.id("container-top")).tap();
            await expect(element(by.id("sec-per-page"))).toHaveLabel("6.6");
        });

        it('should eliminate first zero when blurred', async () => {
            await element(by.id("page-from")).tap();
            await element(by.id("page-from")).replaceText("03");
            await element(by.id("container-top")).tap();
            await expect(element(by.id("page-from"))).toHaveValue("3");
        });

        it('should set its value to 1 if value was null when blurred', async () => {
            await element(by.id("page-from")).tap();
            await element(by.id("page-from")).replaceText("");
            await element(by.id("container-top")).tap();
            await expect(element(by.id("page-from"))).toHaveValue("1");
        });
    });

    describe('pageTo', () => {
        it('should calculate sec/page when changed', async () => {
            await element(by.id("page-to")).tap();
            await element(by.id("page-to")).replaceText("100");
            await element(by.id("container-top")).tap();
            await expect(element(by.id("sec-per-page"))).toHaveLabel("18");
        });

        it('should eliminate first zero when blurred', async () => {
            await element(by.id("page-to")).tap();
            await element(by.id("page-to")).replaceText("0100");
            await element(by.id("container-top")).tap();
            await expect(element(by.id("page-to"))).toHaveValue("100");
        });

        it('should set its value to 1 if value was null when blurred', async () => {
            await element(by.id("page-to")).tap();
            await element(by.id("page-to")).replaceText("");
            await element(by.id("container-top")).tap();
            await expect(element(by.id("page-to"))).toHaveValue("300");
        });
    });

    describe('time', () => {
        it('should calculate sec/page when changed', async () => {
            await element(by.id("time")).tap();
            await element(by.id("time")).replaceText("45");
            await element(by.id("container-top")).tap();
            await expect(element(by.id("sec-per-page"))).toHaveLabel("9");
        });

        it('should eliminate first zero when blurred', async () => {
            await element(by.id("time")).tap();
            await element(by.id("time")).replaceText("045");
            await element(by.id("container-top")).tap();
            await expect(element(by.id("time"))).toHaveValue("45");
        });

        it('should set its value to 1 if value was null when blurred', async () => {
            await element(by.id("time")).tap();
            await element(by.id("time")).replaceText("");
            await element(by.id("container-top")).tap();
            await expect(element(by.id("time"))).toHaveValue("30");
        });
    });
});
