import { Page } from "@playwright/test";
import { SearchHelper } from "./helpers/search/search-helper";
import { CookiesHelper } from "./helpers/login/cookies-helper";
import { FiltersHelper } from "./helpers/search/filters-helper";
import { LoginHelper } from "./helpers/login/login-helper";
import { NavigationHelper } from "./helpers/navigation-helper";
import { PropertyDetailsHelper } from "./helpers/details/propertydetails-helper";

export class Framework {
    public cookiesHelper: CookiesHelper;
    public filtersHelper: FiltersHelper;
    public loginHelper: LoginHelper;
    public navigationHelper: NavigationHelper;
    public propertyDetailsHelper: PropertyDetailsHelper;
    public searchHelper: SearchHelper;

    constructor(readonly page: Page) {

        this.cookiesHelper = new CookiesHelper(page);
        this.filtersHelper = new FiltersHelper(page);
        this.loginHelper = new LoginHelper(page);
        this.navigationHelper = new NavigationHelper(page);
        this.propertyDetailsHelper = new PropertyDetailsHelper(page);
        this.searchHelper = new SearchHelper(page);
    }
}
