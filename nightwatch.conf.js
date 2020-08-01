const seleniumServer = require("selenium-server");
const chromedriver = require("chromedriver");
const SCREENSHOT_PATH = "./screenshots/";
const os = require('os');

require('dotenv').config();

module.exports = {
  src_folders: ["tests/ui"],
  page_objects_path: "tests/page-objects",

  webdriver: {
    start_process: true,
    server_path: (os.platform() == 'win32') ? "node_modules/chromedriver/lib/chromedriver/chromedriver.exe" : "node_modules/.bin/chromedriver",
    port: 9515
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: "chrome"
      },
      launch_url: `https://washington.goingtocamp.com/`,
      globals_path : 'globals.js',
    }
  }
};
