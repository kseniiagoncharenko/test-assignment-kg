import { expect, Page } from '@playwright/test';
import { HelperBase } from '../helper-base';
import { PropertyDetailsPage } from '../../pages/details/propertydetails-page.po';
import { IPropertyDetails } from '../../utils/property';

export class PropertyDetailsHelper extends HelperBase {
    public propertyDetailsPage = new PropertyDetailsPage(this.page);

    constructor(readonly page: Page) {
        super(page);
    }

    public async assertPropertyDetailsAreShown(city: string, expectedPropertyDetails: IPropertyDetails) {
        await this.assertAddressIsShown(city, expectedPropertyDetails.street);
        await this.assertPriceIsShown(expectedPropertyDetails.price);
        await this.assertAgentIsShown(expectedPropertyDetails.agent);
    }

    public async assertAddressIsShown(city: string, expectedStreet: string) {
        const addressStr = await this.propertyDetailsPage.addressLabel(city).textContent();
        if (!addressStr) {
            throw new Error('Address not found on the property details page.');
        }
        expect(addressStr, 'Actual address does not match expected address.').toContain(expectedStreet);
    }

    public async assertPriceIsShown(expectedPrice: number) {
        const priceStr = await this.propertyDetailsPage.askedPriceLabel.textContent();
        if (!priceStr) {
            throw new Error('Price not found on the property details page.');
        }

        const priceRegex = /[\d,.]+/;
        const priceMatch = priceStr!.toString().match(priceRegex);

        if (!priceMatch) {
            throw new Error('No match was found.');
        }
        const actualPrice = Number(priceMatch[0].replace('.', '').replace(',', '.'));

        expect(actualPrice, 'Actual price does not match expected price.').toEqual(expectedPrice);
    }

    public async assertAgentIsShown(expectedAgent: string) {
        const agentStr = this.propertyDetailsPage.agentLabel(expectedAgent);
        await agentStr.first().waitFor();
        expect(await agentStr.count(), 'No real estate agent data shown on a property details page.').toBeGreaterThan(0);
    }
}