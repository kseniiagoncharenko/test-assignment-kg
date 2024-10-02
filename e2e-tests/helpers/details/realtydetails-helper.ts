import { expect, Page } from '@playwright/test';
import { HelperBase } from '../helper-base';
import { RealtyDetailsPage } from '../../pages/details/realtydetails-page.po';

export class RealtyDetailsHelper extends HelperBase {
    public realtyDetailsPage = new RealtyDetailsPage(this.page);

    constructor(readonly page: Page) {
        super(page);
    }

    public async assertAddressIsShown(city: string, expectedStreet: string) {
        const addressStr = await this.realtyDetailsPage.address(city).textContent();
        expect(addressStr, 'Actual address does not match expected address.').toContain(expectedStreet);
    }
}