import { Page } from '@playwright/test';

export abstract class HelperBase {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}
