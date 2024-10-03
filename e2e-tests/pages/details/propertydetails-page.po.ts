import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class PropertyDetailsPage extends BasePage {

    public addressLabel: (city: string) => Locator;
    public askedPriceLabel: Locator;
    public agentLabel: (agentTitle: string) => Locator;

    constructor(readonly page: Page) {
        super(page);
        this.addressLabel = (city: string): Locator => page.locator(`[city="${city}"]`);
        this.askedPriceLabel = page.locator('//dt[text()="Vraagprijs"]/following-sibling::dd[1]//span[normalize-space(text())]');
        this.agentLabel = (agentTitle: string): Locator => page.locator(`a[title="${agentTitle}"]`);
    }
}
