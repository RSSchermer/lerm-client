import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Controller, computed } = Ember;
const { alias } = computed;

export default Controller.extend({
  rule: alias('model.rule'),

  phrases: alias('rule.phrases'),

  dataElements: alias('model.dataElements'),

  activePhrases: computed('phrases.@each.discarded', function() {
    return this.get('phrases').filter((p) => !p.get('discarded'));
  }),

  savePhraseTask: task(function *(phrase) {
    yield phrase.save();
  }),

  saveDataElementTask: task(function *(dataElement) {
    yield dataElement.save();
  }),

  linkDataElementTask: task(function *(phrase, dataElement) {
    phrase.get('dataElements').addObject(dataElement);

    yield phrase.save();
  }),

  unlinkDataElementTask: task(function *(phrase, dataElement) {
    phrase.get('dataElements').removeObject(dataElement);
    yield phrase.save();
  }),

  actions: {
    updateCrispness(phrase, value) {
      phrase.set('crisp', value);
      this.get('savePhraseTask').perform(phrase);
    }
  }
});
