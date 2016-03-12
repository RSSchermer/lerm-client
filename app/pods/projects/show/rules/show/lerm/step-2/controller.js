import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Controller, computed } = Ember;
const { alias } = computed;

export default Controller.extend({
  rule: alias('model.rule'),

  phraseTexts: computed('rule.phrases.@each', function() {
    return this.get('rule.phrases').map((p) => p.get('text'));
  }),

  addPhraseTask: task(function *() {
    let newPhraseText = this.get('newPhraseText');

    if (newPhraseText) {
      try {
        let phrase = this.store.createRecord('phrase', {
          text: newPhraseText,
          rule: this.get('rule')
        });

        yield phrase.save();

        this.set('newPhraseText', null);
      } catch (error) {
        this.send('error', error);
      }
    }
  }).drop(),

  deletePhraseTask: task(function *(phrase) {
    try {
      phrase.deleteRecord();

      yield phrase.save();
    } catch (error) {
      this.send('error', error);
    }
  }).drop()
});
