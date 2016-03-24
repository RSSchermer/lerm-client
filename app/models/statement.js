import DS from 'ember-data';
import Ember from 'ember';

const { Model, attr, belongsTo } = DS;
const { computed } = Ember;

export default Model.extend({
  originalCondition: attr('string'),
  originalConsequence: attr('string'),
  cleanedCondition: attr('string'),
  cleanedConsequence: attr('string'),
  discarded: attr('boolean'),

  rule: belongsTo('rule'),

  condition: computed('originalCondition', 'cleanedCondition', function() {
    return this.get('cleanedCondition') || this.get('originalCondition');
  }),

  consequence: computed('originalConsequence', 'cleanedConsequence', function() {
    return this.get('cleanedConsequence') || this.get('originalConsequence');
  })
});
