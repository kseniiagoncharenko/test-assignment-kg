import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base-page';
import { OfferingTypeFilter, PropertyTypeFilter } from '../../utils/constants';

export class FiltersPopupPage extends BasePage {

    private offeringTypeBtn: (offeringType: OfferingTypeFilter) => Locator;
    private priceFilterMin: Locator;
    private priceFilterMax: Locator;
    private propertyTypeCheckbox: (propertyType: PropertyTypeFilter) => Locator;

    private showResultsBtn: Locator;

    constructor(readonly page: Page) {
        super(page);
        this.offeringTypeBtn = (offeringType: OfferingTypeFilter): Locator =>
            page.locator(`[data-test-id=offering-type-${offeringType}]`);
        this.priceFilterMin = page.locator('[data-test-id=price-filter]')
            .locator('[data-test-id=minmax-filter-min]');
        this.priceFilterMax = page.locator('[data-test-id=price-filter]')
            .locator('[data-test-id=minmax-filter-max]');
        this.propertyTypeCheckbox = (propertyType: PropertyTypeFilter): Locator =>
            page.locator(`[data-test-id=${propertyType}-checkbox-filter] label`);

        this.showResultsBtn = page.locator('[data-test-id=show-results]');
    }

    public async setOfferingType(offeringType: OfferingTypeFilter) {
        await this.offeringTypeBtn(offeringType).click();
    }

    public async setMinPriceFilter(minPrice: string) {
        await this.priceFilterMin.locator('[data-test-id=ui-select]').selectOption(minPrice);
    }

    public async setMaxPriceFilter(maxPrice: string) {
        await this.priceFilterMax.locator('[data-test-id=ui-select]').selectOption(maxPrice);
    }

    public async setPropertyType(propertyType: PropertyTypeFilter) {
        await this.propertyTypeCheckbox(propertyType).click();
    }

    public async clickShowResultsBtn() {
        await this.showResultsBtn.click();
    }
}
