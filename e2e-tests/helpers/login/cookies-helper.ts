import { Page } from '@playwright/test';
import { HelperBase } from '../helper-base';
import { CookiesPopupPage } from '../../pages/login/cookiespopup-page.po';

export class CookiesHelper extends HelperBase {
    public popupPage = new CookiesPopupPage(this.page);

    constructor(readonly page: Page) {
        super(page);
    }

    public async acceptCookiesIfRequired() {
        if (await this.popupPage.cookiesPopup.isVisible()) {
            await this.popupPage.clickAcceptCookiesBtn();
        }
    }
}