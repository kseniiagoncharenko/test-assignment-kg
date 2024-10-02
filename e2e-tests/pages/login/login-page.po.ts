import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class LoginPage extends BasePage {

    public loginForm: Locator;
    public notificationMsg: Locator;

    private emailInput: Locator;
    private passwordInput: Locator;
    private loginBtn: Locator;
    private accountExistsTitle: Locator;
    private loginWithEmailBtn: Locator;

    constructor(readonly page: Page) {
        super(page);
        this.loginForm = page.locator('[data-login-submit-form]');
        this.emailInput = page.locator('#UserName');
        this.passwordInput = page.locator('#Password');
        this.loginBtn = page.locator('//button[text()="Log in"]');
        this.accountExistsTitle = page.getByText('Heb je al een account?');
        this.loginWithEmailBtn = page.getByText('Log in met e-mail');
        this.notificationMsg = page.locator('div .notification');
    }

    public async isLoginRequiredVisible() {
        return await this.loginWithEmailBtn.isVisible()
            && await this.accountExistsTitle.isVisible();
    }

    public async setUserEmail(email: string) {
        await this.emailInput.clear();
        await this.emailInput.fill(email);
    }

    public async setPassword(password: string) {
        await this.passwordInput.clear();
        await this.passwordInput.fill(password);
    }

    public async clickLoginBtn() {
        await this.loginBtn.click();
    }
}
