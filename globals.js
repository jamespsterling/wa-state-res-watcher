var options = {
  printFailureAssertionOnly: true,
  sendOnlyOnFailure: true,
  slack_message: function(results, options) {
    var text;
    if (results.failed) {
      text = 'Site is available!';
    }
    return {
      // text: 'Test completed, passed ' + results.passed + ', failed ' + results.failed,
      text: text,
      username: 'Nightwatch',
      icon_emoji: ':ghost:'
    };
  },
  slack_webhook_url: 'https://hooks.slack.com/services/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'
};

module.exports = {
  // 
  waitForConditionTimeout: 1000,
  reporter: (require('nightwatch-slack-failure-reporter')(options))
};