import puppeteer from 'puppeteer';
import { getGhosts } from './scrapers/ghosts.scraper';
import { writeJson } from './utils/write-to-json.util';

export const scraper = async () => {
    let browser;

    try {
        browser = await puppeteer.launch({ headless: 'new' });

        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(2 * 60 * 1000);

        console.log('Loading site 🌐');
        await page.goto('https://tybayn.github.io/phasmo-cheat-sheet/');

        console.log('Hunting ghosts 👻');
        const ghosts = await getGhosts(page);
        console.info(`Found ${ghosts.length} ghosts! 🔍`);

        writeJson('ghosts', ghosts);

        await browser.close();
    } catch (e) {
        console.error('scrape failed', e);
    }
};
