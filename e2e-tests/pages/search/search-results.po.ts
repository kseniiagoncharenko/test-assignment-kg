import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base-page';
import { SortingOptions } from '../../utils/constants';

export class SearchResultsPage extends BasePage {

    public searchBoxInput: Locator;
    public searchTagsContainer: Locator;

    public filtersBtn: Locator;
    public sortingDropdown: Locator;

    public searchResultItem: Locator;
    public searchResultPostalCodeCity: Locator;

    constructor(readonly page: Page) {
        super(page);
        this.searchBoxInput = page.getByTestId('searchBoxSuggestions-mobile');
        this.searchTagsContainer = this.searchBoxInput.locator('#tags-container');

        this.filtersBtn = page.locator('[data-test-id=filter-count-button]');
        this.sortingDropdown = page.locator('[data-test-id=sorting-dropdown]');

        this.searchResultItem = page.locator('[data-test-id=search-result-item]');
        this.searchResultPostalCodeCity = page.locator('[data-test-id=postal-code-city]');
    }

    public async clickOpenFiltersPopup() {
        if (await this.filtersBtn.isVisible()) {
            await this.filtersBtn.click();
        }
    }

    public async setSortingOption(setSortingOption: SortingOptions = SortingOptions.Relevancy) {
        await this.sortingDropdown.selectOption(setSortingOption);
    }
}
