import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Controller, computed } = Ember;
const { alias } = computed;

export default Controller.extend({
  rule: alias('model.rule'),

  isEditing: false,

  savePhraseTask: task(function *(phrase) {
    try {
      yield phrase.save();
    } catch (error) {
      this.send('error', error);
    }
  }),

  saveStatementTask: task(function *(statement) {
    try {
      yield statement.save();
    } catch (error) {
      this.send('error', error);
    }
  }),

  actions: {
    discardPhrase(phrase) {
      phrase.set('discarded', true);

      this.get('savePhraseTask').perform(phrase);
    },

    reinstatePhrase(phrase) {
      phrase.set('discarded', false);

      this.get('savePhraseTask').perform(phrase);
    }
  }
});
