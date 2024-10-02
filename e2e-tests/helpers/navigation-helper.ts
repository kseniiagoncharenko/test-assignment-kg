import { Page } from '@playwright/test';
import { HelperBase } from './helper-base';
import { NavigationMenuPage } from '../pages/navigation-menu.po';

export class NavigationHelper extends HelperBase {
    public navigationMenuPage = new NavigationMenuPage(this.page);

    constructor(readonly page: Page) {
        super(page);
    }

    public async assertFavoritesAccessibility() {
        await this.navigationMenuPage.clickFavoritesBtn();
    }

    public async navigateToFavoritesPage() {
        await this.navigationMenuPage.clickFavoritesBtn();
    }

    public async navigateToLoginPage() {
        await this.navigationMenuPage.navigationMenu.waitFor();
        await this.navigationMenuPage.clickLoginBtn();
    }
}