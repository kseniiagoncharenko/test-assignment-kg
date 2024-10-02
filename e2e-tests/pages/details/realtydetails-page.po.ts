import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class RealtyDetailsPage extends BasePage {

    public address: (city: string) => Locator;

    constructor(readonly page: Page) {
        super(page);
        this.address = (city: string): Locator => page.locator(`[city=${city}]`);
    }
}
