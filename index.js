const nightwatch = require('nightwatch');

/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.checkSites = (event, context) => {

    nightwatch.cli(function(argv) {

        argv.config = './nightwatch.conf.js';
        argv.reporter = './reporters/slack.js';
        argv.headless = true;
        argv.verbose = false;

        const runner = nightwatch.CliRunner(argv);
        runner
            .setup()
            .startWebDriver()
            .catch(err => {
                console.error(err);
                throw err;
            })
            .then(() => {
                return runner.runTests();
            })
            .catch(err => {
                console.error(err);
                runner.processListener.setExitCode(10);
            })
            .then(() => {
                return runner.stopWebDriver();
            })
            .then(() => {
                process.exit(0);
            })
            .catch(err => {
                console.error(err);
            });
    });
};