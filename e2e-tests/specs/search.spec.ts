import { test, type Page } from '@playwright/test';
import { getBuyUrl, getRentUrl } from '../helpers/urls';
import { OfferingTypeFilter, PropertyTypeFilter, SortingOptions } from '../utils/constants';
import { Framework } from '../framework';

let page: Page;
let framework: Framework;

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto('/');

  framework = new Framework(page);

  await framework.cookiesHelper.acceptCookiesIfRequired();
});

test.afterEach(async () => {
  await page.close();
});

test.use({ userAgent: 'userAgent goes here' });

test.describe('Search', () => {

  test('Verify search on main page and search results', async ({ }) => {

    const searchData = {
      city: 'Eindhoven',
      area: 'Plaats in Noord-Brabant'
    };

    await framework.searchHelper.searchHouseIn(searchData.city);
    await framework.searchHelper.assertItemsNumberInSuggestionList();
    await framework.searchHelper.selectAreaFromSuggestions(searchData.area);

    await page.waitForURL(getBuyUrl());

    await framework.searchHelper.assertSearchBoxTags([searchData.city]);
    await framework.searchHelper.assertFirstSearchResultCity(searchData.city);
  });


  test('Verify search filters', async ({ }) => {

    const searchData = {
      city: 'Utrecht',
      area: 'Plaats in Utrecht',
      minPrice: '0',
      maxPrice: '1000',
      offeringType: OfferingTypeFilter.Rent
    };

    await framework.searchHelper.searchAndSelectHouseIn(searchData.city, searchData.area);

    await page.waitForURL(getBuyUrl());

    await framework.searchHelper.openFiltersPopup();
    await framework.filtersHelper.changeOfferingType(searchData.offeringType);

    await page.waitForURL(getRentUrl());

    await framework.filtersHelper.applyPriceFilters(searchData.minPrice, searchData.maxPrice);
    await framework.searchHelper.applySortingBy(SortingOptions.PriceDown);
    await framework.searchHelper.assertFirstSearchResultPrice(searchData.maxPrice, searchData.offeringType);
  });

  test('Verify realty details', async ({ }) => {
    
    const searchData = {
      city: 'Amsterdam',
      area: 'Plaats in Noord-Holland',
      propertyType: PropertyTypeFilter.Apartment
    };

    await framework.searchHelper.searchAndSelectHouseIn(searchData.city, searchData.area);

    await framework.searchHelper.openFiltersPopup();
    await framework.filtersHelper.applyPropertyTypeFilters(searchData.propertyType);

    await page.waitForURL(getBuyUrl());

    const expectedStreet = await framework.searchHelper.getAddressFromFirstSearchResult();
    console.log(expectedStreet);
    await framework.searchHelper.openFirstSearchResultDetails();

    await framework.realtyDetailsHelper.assertAddressIsShown(searchData.city, expectedStreet)
  });
});