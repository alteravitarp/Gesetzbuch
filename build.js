const glob = require('glob');
const fs = require('fs');

glob('./src/**/*.md', {}, (err, files) => {
    files.forEach(fileName => {
        let fh = fs.readFileSync(fileName, { encoding: 'utf8' });

        let numbers = fh.replace(/\((\d+)\)\./gm, '[!badge size="s" variant="dark" text="$1."] ')

        fs.writeFileSync(fileName, numbers, { encoding: 'utf-8' });
    });
})