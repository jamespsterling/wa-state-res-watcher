const seleniumServer = require("selenium-server");
const chromedriver = require("chromedriver");
// const SCREENSHOT_PATH = "./screenshots/";
const os = require('os');

// require('dotenv').config();

module.exports = {
  src_folders: ["tests/ui"],
  // page_objects_path: "tests/page-objects",

  webdriver: {
    start_process: true,
    server_path: "node_modules/.bin/chromedriver",
    // server_path: "node_modules/chromedriver/lib/chromedriver/chromedriver",
    port: 9515
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: "chrome"
      },
      launch_url: `https://washington.goingtocamp.com`,

      // Lake Wenatchee
      site_uri: `/create-booking/results?mapId=-2147483375&searchTabGroupId=0&bookingCategoryId=0&startDate=2020-08-21T00:00:00.000Z&endDate=2020-08-23T00:00:00.000Z&nights=2&isReserving=true&equipmentId=-32768&subEquipmentId=-32768&partySize=2&searchTime=2020-07-31T00:00:00.000Z&resourceLocationId=-2147483594`,
      
      // Northeast Washington State Parks
      // site_uri: `/create-booking/results?mapId=-2147483347&searchTabGroupId=0&bookingCategoryId=0&startDate=2020-08-21T00:00:00.000Z&endDate=2020-08-23T00:00:00.000Z&nights=2&isReserving=true&equipmentId=-32768&subEquipmentId=-32768&partySize=2&searchTime=Sat%20Aug%2001%202020%2017:00:00%20GMT-0700%20(Pacific%20Daylight%20Time)`,
      globals_path : 'globals.js',
    }
  }
};
