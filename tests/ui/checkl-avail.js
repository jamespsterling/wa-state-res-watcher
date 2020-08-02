require('../../nightwatch.conf.js');

module.exports = {

  'Available Campsites': function (browser) {

    browser
      .url(`${browser.launchUrl}${browser.options.site_uri}`)
      .waitForElementVisible('#map')
      .assert.elementNotPresent('#map .available');
    }
};
