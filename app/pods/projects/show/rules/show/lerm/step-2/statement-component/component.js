import Ember from 'ember';

const { Component, computed } = Ember;
const { alias } = computed;

export default Component.extend({
  init(...args) {
    this.set('isEditing', this.get('statement.isNew'));

    return this._super(...args);
  },

  showDeleteModal: false,

  rule: alias('statement.rule'),

  phrases: alias('rule.phrases'),

  phraseTexts: computed('phrases.@each.originalText', function() {
    return this.get('phrases').map((p) => p.get('originalText'));
  }),

  actions: {
    startEditing() {
      this.set('isEditing', true);
    },

    stopEditing() {
      this.get('statement').rollbackAttributes();
      this.set('isEditing', false);
    },

    toggleDeleteModal() {
      this.toggleProperty('showDeleteModal');
    },

    saveStatement() {
      this.get('saveTask').perform(this.get('statement')).then(() => {
        this.set('isEditing', false);
      });
    }
  }
});
