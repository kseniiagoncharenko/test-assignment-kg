import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class FundaMainPage extends BasePage {

    private searchBoxInput: Locator;
    public searchLocationSuggestionsList: Locator;
    public searchLocationSuggestions: Locator;
    private searchOnMapBtn: Locator;
    private buyTabBtn: Locator;
    private rentTabBtn: Locator;

    constructor(readonly page: Page) {
        super(page);
        this.buyTabBtn = page.locator('button[data-text="Koop"]');
        this.rentTabBtn = page.locator('button[data-text="Huur"]');
        this.searchBoxInput = page.getByTestId('search-box');
        this.searchLocationSuggestionsList = page.getByRole('listbox');
        this.searchLocationSuggestions = page.getByTestId('SearchBox-location-suggestion');
        this.searchOnMapBtn = page.locator('[aria-label="Zoek op kaart"]');

    }

    public async clickBuyTabBtn() {
        await this.buyTabBtn.click();
    }

    public async clickRentTabBtn() {
        await this.rentTabBtn.click();
    }

    public async clickSearchOnMapBtn() {
        await this.searchOnMapBtn.click();
    }

    public async fillInSearchInput(searchData: string) {
        await this.searchBoxInput.click();
        await this.searchBoxInput.fill(searchData);
    }

    public async selectAreaFromSuggestions(area: string) {
        await this.page.locator(`[data-testid="SearchBox-location-suggestion"] >> text=${area}`)
            .click();
    }
}
