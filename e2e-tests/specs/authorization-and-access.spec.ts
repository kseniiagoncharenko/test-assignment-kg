import { test, type Page } from '@playwright/test';
import { getFavoritesUrl } from '../helpers/urls';
import { incorrectUser } from '../utils/constants';
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

test.describe('Access verification', () => {

  test('Favorites should not be available to unauthorized user', async ({ }) => {
    await framework.navigationHelper.navigateToFavoritesPage();
    await page.waitForURL(getFavoritesUrl());
    await framework.loginHelper.assertUserRequiredToLogin();
  });
});

test.describe('Email verification', () => {

  test('User should not be able to login with incorrect email and password', async ({ }) => {
    await framework.navigationHelper.navigateToLoginPage();

    await framework.loginHelper.loginAs(incorrectUser);
    await framework.loginHelper.assertNotificationIsVisible();
  });
});