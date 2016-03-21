import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  isEditing: false,

  cleanedPhraseTexts: computed('statement.rule.phrases.@each.cleanedText', 'statement.rule.phrases.@each.discarded', function() {
    return this.get('statement.rule.phrases')
      .filter((p) => !p.get('discarded'))
      .map((p) => p.get('cleanedText') || p.get('text'));
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
