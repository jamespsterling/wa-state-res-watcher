const axios = require('axios');
const { IncomingWebhook } = require('@slack/webhook');
require('dotenv').config();

const slackUrl = process.env.SLACK_WEBHOOK_URL;
const baseUrl = 'https://washington.goingtocamp.com';
const seedDate = '2020-08-10T16:48:50.802Z';
const startDate = '2020-08-21T00:00:00.000Z';
const endDate = '2020-08-23T00:00:00.000Z';
const searchTime = new Date().toISOString();
const numNights = 2;
const partySize = 2;

/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.checkSites = (event, context) => {

  const legend = {
    12: "Amphitheater",
    75: "Concession",
    84: "DayUseArea",
    131: "GroupCamping",
    149: "Horseshoes",
    235: "Parking",
    237: "Parkoffice",
    305: "Store",
    306: "Swimming",
    329: "UnservicedCamping",
    335: "Volleyball",
    459: "Dumpstation",
    461: "Fishingcleaningstation",
    464: "PicnicShelter2",
    629: "BoatLaunch3",
    636: "Playground5",
    638: "RestroomWithShowers",
    639: "ServicedCamping1",
    813: "WelcomeStation",
  };

  const statues = {
    0: "Available",
    1: "Unavailable",
    2: "NotOperating",
    3: "NonReservable",
    4: "Closed",
    5: "Invalid",
    6: "InvalidBookingCategory",
    7: "PartiallyAvailable",
    8: "Held",
  };

  const filterData = [
    {
      attributeDefinitionId: -32708,
      enumValues: [1],
      attributeDefinitionDecimalValue: 0,
      filterStrategy: 1,
    },
    {
      attributeDefinitionId: -32759,
      enumValues: [1],
      attributeDefinitionDecimalValue: 0,
      filterStrategy: 1,
    },
  ];

  const formData = {
    mapId: -2147483375,
    cartUid: null,
    bookingUid: null,
    cartTransactionUid: null,
    bookingCategoryId: 0,
    startDate: startDate,
    endDate: endDate,
    isReserving: true,
    getDailyAvailability: false,
    partySize: partySize,
    filterData: JSON.stringify(filterData),
    equipmentCategoryId: -32768,
    subEquipmentCategoryId: -32768,
    boatLength: null,
    boatDraft: null,
    boatWidth: null,
    generateBreadcrumbs: false,
    resourceAccessPointId: null,
  };

  const idMaps = {
    searchTabGroupId: '0',
    equipmentId: '-32768',
    subEquipmentId: '-32768',
    resourceLocationId: '-2147483594'
  };

  const refererUrl = `${baseUrl}/create-booking/results` +
    `?mapId=${formData.mapId}` +
    `&searchTabGroupId=${idMaps.searchTabGroupId}` +
    `&bookingCategoryId=${formData.bookingCategoryId}` +
    `&startDate=${startDate}` +
    `&endDate=${endDate}` +
    `&nights=${numNights}` +
    `&isReserving=true` +
    `&equipmentId=${idMaps.equipmentId}` +
    `&subEquipmentId=${idMaps.subEquipmentId}` +
    `&partySize=${partySize}` +
    `&searchTime=${searchTime}` +
    `&resourceLocationId=${idMaps.resourceLocationId}`;

  const httpHdl = async (options) => {

      return await axios(options)
      .then(function (response) {
        if (response.status === 200) {
          return response.data;
        } else {
          console.error(response.statusText);
          process.exit();
        }
      })
      .catch(function (error) {
        console.error(error);
        process.exit();
      });
  };

  const getAvail = async () => {

    return httpHdl({
      url: `${baseUrl}/api/maps/mapdatabyid?seed=${seedDate}`,
      method: 'post',
      headers: {
        'accept': 'application/json, text/plain, */*',
        'app-version': '5.32.265',
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'expires': '0',
        'pragma': 'no-cache',
        'authority': baseUrl.replace('https://', ''),
        'dnt': '1',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36',
        'origin': baseUrl,
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'accept-language': 'en-US,en;q=0.9',
        'referer': refererUrl
      },
      data: formData,
    });
  };

  getAvail().then((d) => {

    var mapInfo = d.map.localizedValues[0];

    for (var avail in d.mapLinkAvailabilityMap) {

      if (d.mapLinkAvailabilityMap[avail][0] === 0) {

        const webhook = new IncomingWebhook(slackUrl);

        webhook.send({
          text: `Campsite ${d.mapLinkLocalizedValues[avail][0].title} (${d.mapLinkLocalizedValues[avail][0].description}) ` +
                `available for ${formData.startDate.substr(0, 10)} at ${mapInfo.title} ${refererUrl}`,
        });

      }
    }
  });
};

this.checkSites();
