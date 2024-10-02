import { Page } from '@playwright/test';
import { HelperBase } from '../helper-base';
import { FiltersPopupPage } from '../../pages/search/filterpopup-page.po';
import { OfferingTypeFilter, PropertyTypeFilter } from '../../utils/constants';

export class FiltersHelper extends HelperBase {

    public filtersPopupPage = new FiltersPopupPage(this.page);

    constructor(readonly page: Page) {
        super(page);
    }

    public async changeOfferingType(offeringType: OfferingTypeFilter) {
        await this.filtersPopupPage.setOfferingType(offeringType);
    }

    public async setPriceFilter(minPrice: string, maxPrice: string) {
        await this.filtersPopupPage.setMinPriceFilter(minPrice);
        await this.filtersPopupPage.setMaxPriceFilter(maxPrice);
    }

    public async applyPriceFilters(priceMin: string, priceMax: string) {
        await this.setPriceFilter(priceMin, priceMax);
        await this.filtersPopupPage.clickShowResultsBtn();
    }

    public async applyPropertyTypeFilters(propertyType: PropertyTypeFilter) {
        await this.filtersPopupPage.setPropertyType(propertyType);
        await this.filtersPopupPage.clickShowResultsBtn();
    }
}
