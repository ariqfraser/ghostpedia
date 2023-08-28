import { ElementHandle, Page } from 'puppeteer';
import { Ghost } from '../types/ghost.types';
import { getSpeeds } from '../utils/get-speeds.util';

const _ghost: Ghost = {
    name: '',
    evidence: {
        emf: false,
        dots: false,
        uv: false,
        freezing: false,
        orbs: false,
        writing: false,
        box: false,
    },
    speed: [0],
    sanity: 0,
    behaviour: [],
};

const evidenceKeys = Object.keys(_ghost.evidence);

const getText = (elem: Element) => elem.textContent;

export const getGhosts = async (page: Page) => {
    await page.waitForSelector('#Wraith');
    const ghostCards$ = await page.$$('.ghost_card');

    const ghosts: Ghost[] = [];

    for (const currGhost$ of ghostCards$) {
        const ghost = structuredClone(_ghost);
        const name = (await currGhost$.$eval('.ghost_name', getText)) || '';
        const sanity = (await currGhost$.$eval('.ghost_hunt', getText)) || '0';
        const evidences$ = await currGhost$.$$('.ghost_evidence_item');
        const speeds$ = await currGhost$.$('.ghost_speed_values');
        const behaviour =
            (await currGhost$.$eval('.ghost_behavior_item', (elem) => {
                const nodeList: ChildNode[] = [...elem.childNodes];
                const infoArray: { title: string; info: string[] }[] = [];

                let title: string = '';
                for (const node of nodeList) {
                    if (node.nodeName === 'DIV') {
                        title = node.textContent || '';
                        continue;
                    }

                    const info = [...node.childNodes].map(
                        (li) => li?.textContent || ''
                    );

                    infoArray.push({ title, info });
                }

                return infoArray;
            })) || 'NA';

        await speeds$?.evaluate((elem) => {
            const spans = elem.querySelectorAll('span');
            spans.forEach((span) => {
                span.remove();
            });
        });
        const speedsRAW = (await speeds$?.evaluate(getText)) || '';

        // apply values

        for (const ev$ of evidences$) {
            const evidence = (await ev$.evaluate(getText)) || '';

            if (evidence === 'Ultraviolet') {
                ghost.evidence.uv = true;
            }

            for (const key of evidenceKeys) {
                if (ghost.evidence[key]) continue;
                ghost.evidence[key] = evidence.toLowerCase().includes(key);
            }
        }

        ghost.behaviour = behaviour;
        ghost.name = name;
        ghost.sanity = Number.parseInt(sanity.replace(/%/, ''));
        ghost.speed = getSpeeds(speedsRAW);

        ghosts.push(ghost);

        console.log(`👻 ${name}`);
    }

    return ghosts;
};
