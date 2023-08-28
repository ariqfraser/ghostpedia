import { scraper } from './scraper';

const main = async () => {
    console.log('bootstrapping');
    await scraper();
};

main();
