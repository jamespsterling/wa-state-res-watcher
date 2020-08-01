const logoutCommands = {
  doLogout: function() {
    this
      .waitForElementVisible('@personaMenu')
      .assert.visible('@personaMenu')
      .click('@personaMenu')
      .assert.visible('@logout')
      .click('@logout');

    return this;
  }
};

module.exports = {
  commands: [logoutCommands],
  elements: {
    show: '.login-show-trigger',
    personaMenu: '#persona-menu',
    logout: '#logout'
  }
};