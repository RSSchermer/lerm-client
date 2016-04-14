import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Controller, computed } = Ember;
const { alias } = computed;

export default Controller.extend({
  rule: alias('model.rule'),

  phrases: alias('rule.phrases'),

  statements: alias('rule.statements'),

  isEditing: false,

  displayCleanStatementWarning: computed(
    'phrases.@each.cleanedText',
    'phrases.@each.discarded',
    'statements.@each.cleanedCondition',
    'statements.@each.cleanedConsequence',
    'statements.@each.discarded',
    function() {
      return this.get('phrases').any((p) => !!p.get('cleanedText') || p.get('discarded')) &&
          !this.get('statements')
            .any((s) => !!s.get('cleanedCondition') || !!s.get('cleanedConsequence') || s.get('discarded'));
    }
  ),

  savePhraseTask: task(function *(phrase) {
    yield phrase.save();
  }),

  saveStatementTask: task(function *(statement) {
    yield statement.save();
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
