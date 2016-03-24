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
    try {
      yield phrase.save();
    } catch (error) {
      this.send('error', error);
    }
  }),

  saveDataElementTask: task(function *(dataElement) {
    yield dataElement.save();
  }),

  linkDataElementTask: task(function *(phrase, dataElement) {
    try {
      phrase.get('dataElements').addObject(dataElement);
      yield phrase.save();
    } catch (error) {
      this.send('error', error);
    }
  }),

  unlinkDataElementTask: task(function *(phrase, dataElement) {
    try {
      phrase.get('dataElements').removeObject(dataElement);
      yield phrase.save();
    } catch (error) {
      this.send('error', error);
    }
  }),

  actions: {
    updateCrispness(phrase, value) {
      phrase.set('crisp', value);
      this.get('savePhraseTask').perform(phrase);
    }
  }
});
