import { expect, Page } from '@playwright/test';
import { FundaMainPage } from '../../pages/main-page';
import { HelperBase } from '../helper-base';
import { OfferingTypeFilter, OfferringTypeMap, SortingOptions, suggestionsNumber } from '../../utils/constants';
import { IPropertyDetails } from '../../utils/property';
import { SearchResultsPage } from '../../pages/search/search-results.po';
import { FiltersPopupPage } from '../../pages/search/filterpopup-page.po';

export class SearchHelper extends HelperBase {
    public mainPage = new FundaMainPage(this.page);
    public searchResultsPage = new SearchResultsPage(this.page);
    public filtersPopupPage = new FiltersPopupPage(this.page);

    constructor(readonly page: Page) {
        super(page);
    }

    public async searchHouseIn(name: string) {
        await this.mainPage.fillInSearchInput(name);
    }

    public async openSearchOnMap() {
        await this.mainPage.clickSearchOnMapBtn();
    }

    public async selectAreaFromSuggestions(area: string) {
        await this.mainPage.searchLocationSuggestionsList.waitFor();
        await this.mainPage.selectAreaFromSuggestions(area);
    }

    public async searchAndSelectHouseIn(name: string, area: string) {
        await this.searchHouseIn(name);
        await this.mainPage.selectAreaFromSuggestions(area);
    }

    public async assertItemsNumberInSuggestionList() {
        await this.mainPage.searchLocationSuggestionsList.waitFor();
        expect(this.mainPage.searchLocationSuggestions, 'Suggestions number isn\'t correct.').toHaveCount(suggestionsNumber);
    }

    public async assertSearchBoxTags(tags: string[]) {
        await this.searchResultsPage.searchTagsContainer.waitFor();
        tags.forEach(tag => {
            expect(this.searchResultsPage.searchTagsContainer, 'Expected area is not shown in a search box.').toContainText(tag);
        });
    }

    public async openFiltersPopup() {
        await this.searchResultsPage.clickOpenFiltersPopup();
    }

    public async applySortingBy(sortingOption: SortingOptions) {
        await this.searchResultsPage.setSortingOption(sortingOption);
    }

    public async getSearchResultFirst() {
        const searchResult = this.searchResultsPage.searchResultItem.first();
        expect(searchResult, 'Search result should not be null or undefined').not.toBeNull();
        return searchResult;
    }

    public async getSearchResultPropertyDetails(offeringType: OfferingTypeFilter) {
        const street = await this.getAddressFromFirstSearchResult();
        const price = await this.getPriceFromFirstSearchResult(offeringType);
        const agent = await this.getAgentFromFirstSearchResult();

        const propertyDetails: IPropertyDetails = { street, price, agent };
        return propertyDetails;
    }

    public async getAddressFromFirstSearchResult() {
        const firstSearchResult = await this.getSearchResultFirst();

        const addressStr = await firstSearchResult.locator(`[data-test-id=street-name-house-number]`).textContent();
        if (!addressStr) {
            throw new Error('Address not found in the first search result.');
        }
        return addressStr.trim();
    }

    public async getPriceFromFirstSearchResult(offeringType: OfferingTypeFilter) {
        const firstSearchResult = await this.getSearchResultFirst();

        const priceStr = await firstSearchResult.locator(`[data-test-id=price-${OfferringTypeMap[offeringType]}]`).textContent();
        if (!priceStr) {
            throw new Error('Price not found in the first search result.');
        }

        const priceRegex = /[\d,.]+/;
        const priceSearchResult = priceStr!.toString().match(priceRegex);
        if (!priceSearchResult) {
            throw new Error('No match was found.');
        }
        const price = Number(priceSearchResult[0].replace('.', '').replace(',', '.'));

        return price;
    }

    public async getAgentFromFirstSearchResult() {
        const firstSearchResult = await this.getSearchResultFirst();
        const agentTitle = await firstSearchResult.locator('a:has-text("makelaar")').textContent();
        if (!agentTitle) {
            throw new Error('Real estate agent title not found in the first search result.');
        }

        console.log("Agent: " + agentTitle.trim());
        return agentTitle.trim();
    }

    public async openFirstSearchResultDetails() {
        const firstSearchResult = await this.getSearchResultFirst();
        await firstSearchResult.locator('[data-test-id=object-image-link]').click();
    }

    public async assertFirstSearchResultCity(city: string) {
        const firstSearchResult = await this.getSearchResultFirst();
        expect(firstSearchResult.locator('[data-test-id=postal-code-city]'),
            'Actual city for the first search result differs from the expected.')
            .toContainText(city);
    }

    public async assertFirstSearchResultPrice(expectedPrice: string, offeringType: OfferingTypeFilter) {
        const actualPrice = await this.getPriceFromFirstSearchResult(offeringType);

        expect(Number(actualPrice), 'Actual maximal price is higher than set in price filter.').toBeLessThanOrEqual(Number(expectedPrice));
    }
}
