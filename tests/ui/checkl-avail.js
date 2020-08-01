require('../../nightwatch.conf.js');

module.exports = {

  'Available Campsites': function (browser) {

    browser
      // .url(`${browser.launchUrl}/create-booking/results?mapId=-2147483419&searchTabGroupId=0&bookingCategoryId=0&startDate=2020-08-21T00:00:00.000Z&endDate=2020-08-23T00:00:00.000Z&nights=2&isReserving=true&equipmentId=-32768&subEquipmentId=-32768&partySize=2&searchTime=Sat%20Aug%2001%202020%2009:49:13%20GMT-0700%20(Pacific%20Daylight%20Time)&resourceLocationId=-2147483594`)
      .url(`${browser.launchUrl}/create-booking/results?mapId=-2147483375&searchTabGroupId=0&bookingCategoryId=0&startDate=2020-08-21T00:00:00.000Z&endDate=2020-08-23T00:00:00.000Z&nights=2&isReserving=true&equipmentId=-32768&subEquipmentId=-32768&partySize=2&searchTime=2020-07-31T00:00:00.000Z&resourceLocationId=-2147483594`)
      .waitForElementVisible('#map')
      .assert.elementNotPresent('#map .available');
    }
};
