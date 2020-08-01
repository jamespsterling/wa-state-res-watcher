const loginCommands = {
  doLogin: function(email, password) {
    this
      .navigate()
      .waitForElementVisible('body')
      .assert.titleContains('IoT In Action Events')
      .assert.visible('@show')
      .click('@show')
      .waitForElementVisible('@email')
      .setValue('@email', email)
      .setValue('@password', password)
      .click('@submit');

    return this;
  }
};

module.exports = {
  commands: [loginCommands],
  url: function() {
    return this.api.launchUrl + '/login';
  },
  elements: {
    show: '.login-show-trigger',
    submit: '.login-button',
    email: 'input[type=email]',
    password: 'input[type=password]',
  }
};