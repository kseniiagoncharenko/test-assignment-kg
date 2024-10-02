import { expect, Page } from '@playwright/test';
import { HelperBase } from '../helper-base';
import { PropertyDetailsPage } from '../../pages/details/propertydetails-page.po';

export class PropertyDetailsHelper extends HelperBase {
    public propertyDetailsPage = new PropertyDetailsPage(this.page);

    constructor(readonly page: Page) {
        super(page);
    }

    public async assertAddressIsShown(city: string, expectedStreet: string) {
        const addressStr = await this.propertyDetailsPage.address(city).textContent();
        expect(addressStr, 'Actual address does not match expected address.').toContain(expectedStreet);
    }
}