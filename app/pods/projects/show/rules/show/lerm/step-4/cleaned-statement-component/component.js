import Ember from 'ember';

const { Component, computed } = Ember;

const { alias } = computed;

export default Component.extend({
  isEditing: false,

  rule: alias('statement.rule'),

  phrases: alias('rule.phrases'),

  cleanedPhraseTexts: computed('phrases.@each.text', 'phrases.@each.discarded', function() {
    return this.get('phrases').filter((p) => !p.get('discarded')).map((p) => p.get('text'));
  }),

  actions: {
    startEditing() {
      this.set('isEditing', true);
    },

    stopEditing() {
      this.get('statement').rollbackAttributes();
      this.set('isEditing', false);
    },

    saveStatement() {
      this.get('saveTask').perform(this.get('statement')).then(() => {
        this.set('isEditing', false);
      });
    },

    discardStatement() {
      let statement = this.get('statement');

      statement.rollbackAttributes();
      this.set('isEditing', false);
      statement.set('discarded', true);
      this.get('saveTask').perform(statement);
    },

    reinstateStatement() {
      let statement = this.get('statement');

      statement.set('discarded', false);
      this.get('saveTask').perform(statement);
    }
  }
});
