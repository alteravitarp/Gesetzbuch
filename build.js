const glob = require('glob');
const fs = require('fs');
const platform = require('retypeapp/platform').name;
const spawn = require('child_process').spawn;
const path = require('path');
const fse = require('fs-extra');

try {
    if (fse.existsSync('./build')) {
        fse.removeSync('./build')
    }
    fse.copySync('./src', './build');

    glob('./build/**/*.md', {}, (err, files) => {
        files.forEach(fileName => {
            let text = fs.readFileSync(fileName, { encoding: 'utf8' });

            text = text.replace(/\((\d+)\)\./gm, '[!badge size="s" variant="dark" text="$1."] ')
            text = text.replace(/\[\[([\xA7\x20-\x2E\x3A-\x40\w]+)\]\]/gm, '[!badge size="s" variant="ghost" text="$1"]')
            text = text.replace(/\[\[([\xA7\x20-\x2E\x3A-\x40\w]+)\]\=([a-z]+)\]/gm, '[!badge size="s" variant="$2" text="$1"]')

            fs.writeFileSync(fileName, text, { encoding: 'utf-8' });
        });
    })
} catch(err) {
    console.log(err);
}

var execPath = path.resolve(path.join(__dirname, './node_modules/retypeapp/platforms', platform, './retype'))
var args = [];

var verbose = false,
    reading_args = true;
if (process.argv.length > 2) {
    for (var i = 2; i < process.argv.length; i++) {
        var arg = process.argv[i];
        if (arg == "--") {
            reading_args = false;
        } else if (reading_args && process.argv[i] == "--verbose") {
            verbose = true;
        }

        args.push(process.argv[i]);
    }
}

function verboseLog(message) {
    if (verbose) {
        console.log("Node.JS wrapper: " + message);
    }
}

function cleanQuit(code) {
    if (!platform.startsWith("win-") && process.stdout.isTTY) {
        verboseLog("resetting terminal cursor key and keypad modes.");
        process.stdout.write("\x1b[?1l\x1b>");
    }

    try {
        fse.removeSync('./build');
    } catch(err) {
        console.log(err);
    }

    verboseLog("exiting with status " + code + ".");
    process.exit(code);
}

var processHandle = spawn(execPath, args, { stdio: 'inherit' });

// Continue execution on SIGINT; Retype is supposed to handle it.
process.on("SIGINT", () => {});
processHandle.on('exit', (code, signal) => cleanQuit(code));