import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  isEditing: false,

  actions: {
    startEditing() {
      this.set('isEditing', true);
    },

    savePhrase() {
      this.get('saveTask').perform(this.get('phrase')).then(() => {
        this.set('isEditing', false);
      });
    }
  }
});
