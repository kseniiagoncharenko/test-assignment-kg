import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class NavigationMenuPage extends BasePage {

    public navigationMenu: Locator;
    private favoritesBtn: Locator;
    private loginBtn: Locator;

    constructor(readonly page: Page) {
        super(page);
        this.navigationMenu = page.locator('[data-navigation-menu]');
        this.favoritesBtn = page.locator('//span[text()="Favorieten"]');
        this.loginBtn = page.locator('//button[.//span[text()="Inloggen"]]');
    }

    public async clickFavoritesBtn() {
        await this.favoritesBtn.click();
    }

    public async clickLoginBtn() {
        await this.loginBtn.waitFor();
        await this.loginBtn.click();
    }
}
