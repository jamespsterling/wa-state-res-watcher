const profileCommands = {
  loadProfile: function() {
    this
      .waitForElementVisible('@personaMenu')
      .assert.visible('@personaMenu')
      .click('@personaMenu')

      .waitForElementVisible('@profileMenu')
      .assert.visible('@profileMenu')
      .click('@profileMenu')

      .assert.visible('@profileView');

    return this;
  }
};

module.exports = {
  commands: [profileCommands],
  url: function() {
    return this.api.launchUrl;
  },
  elements: {
    personaMenu: '#persona-menu',
    profileMenu: '#edit-profile',
    profileView: '.profile-avatar-wrap',
    firstName: 'input[name=first_name]',
    profileSave: '#save-profile',
    lastName: 'input[name=last_name]'
  }
};
