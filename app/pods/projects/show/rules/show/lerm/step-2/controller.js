import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Controller, computed } = Ember;
const { alias } = computed;

export default Controller.extend({
  rule: alias('model.rule'),

  phraseTexts: computed('rule.phrases.@each.originalText', function() {
    return this.get('rule.phrases').map((p) => p.get('originalText'));
  }),

  addPhraseTask: task(function *() {
    let newPhraseText = this.get('newPhraseText');

    if (newPhraseText) {
      let phrase = this.store.createRecord('phrase', {
        originalText: newPhraseText,
        rule: this.get('rule')
      });

      yield phrase.save();

      this.set('newPhraseText', null);
    }
  }).drop(),

  deletePhraseTask: task(function *(phrase) {
    try {
      phrase.deleteRecord();

      yield phrase.save();
    } catch (error) {
      this.send('error', error);
    }
  }).drop(),

  saveStatementTask: task(function *(statement) {
    yield statement.save();
  }).drop(),

  deleteStatementTask: task(function *(statement) {
    try {
      statement.deleteRecord();

      yield statement.save();
    } catch (error) {
      this.send('error', error);
    }
  }),

  actions: {
    addStatement() {
      this.store.createRecord('statement', { rule: this.get('rule') });
    }
  }
});
