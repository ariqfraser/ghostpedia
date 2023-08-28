import * as fs from 'fs';
import { environment } from '../evnironment';

export const writeJson = (fileName: string, object: object) => {
    const data = JSON.stringify(object, null, 2);

    fs.mkdir(environment.outputBase, { recursive: true }, (dirErr) => {
        if (dirErr) {
            console.error('Failed to make output folder :/');
            return;
        }

        fs.writeFile(
            `${environment.outputBase + fileName}.json`,
            data,
            (fileError) => {
                if (fileError) {
                    console.error(
                        `Failed to write json file: ${fileError}`,
                        fileError
                    );
                    return;
                }
                console.log(`⭐Successfully wrote: ${fileName} ⭐`);
            }
        );
    });
};
