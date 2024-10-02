import { expect, Page } from '@playwright/test';
import { HelperBase } from '../helper-base';
import { LoginPage } from '../../pages/login/login-page.po';

export class LoginHelper extends HelperBase {

    public loginPage = new LoginPage(this.page);

    constructor(readonly page: Page) {
        super(page);
    }

    public async loginAs(user: { email: string, password: string }) {
        await this.loginPage.loginForm.waitFor()
        await this.loginPage.setUserEmail(user.email);
        await this.loginPage.setPassword(user.password);
        await this.loginPage.clickLoginBtn();
    }

    public async assertUserRequiredToLogin() {
        return await this.loginPage.isLoginRequiredVisible();
    }

    public async assertNotificationIsVisible() {
        await this.loginPage.loginForm.waitFor()
        expect(this.loginPage.notificationMsg, 'Email verification message is not visible.').toBeVisible();
    }
}
