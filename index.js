const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');

const FILE_PATH = './data.json';
const DATE = moment().subtract(1, 'd').format();

async function run() {
    const data = { date: DATE };

    try {
        await jsonfile.writeFile(FILE_PATH, data, { spaces: 2 });
        console.log('Wrote', FILE_PATH);

        const git = simpleGit();
        await git.add([FILE_PATH]);
        await git.commit(DATE, { '--date': DATE });
        await git.push();

        console.log('Committed and pushed successfully');
    } catch (err) {
        console.error('Failed:', err.message);
        process.exit(1);
    }
}

run();