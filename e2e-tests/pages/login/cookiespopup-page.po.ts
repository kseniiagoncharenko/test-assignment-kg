import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class CookiesPopupPage extends BasePage {

    public cookiesPopup: Locator;
    public rejectBtn: Locator;
    public acceptBtn: Locator;

    constructor(readonly page: Page) {
        super(page);
        this.cookiesPopup = page.getByTestId('notice');
        this.rejectBtn = page.locator('#didomi-notice-disagree-button');
        this.acceptBtn = page.locator('#didomi-notice-agree-button');
    }

    public async clickAcceptCookiesBtn() {
        await this.acceptBtn.click();
    }
}