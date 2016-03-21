import DS from 'ember-data';
import Ember from 'ember';

const { Model, attr, belongsTo } = DS;
const { computed } = Ember;

export default Model.extend({
  originalText: attr('string'),
  cleanedText: attr('string'),
  discarded: attr('boolean'),
  crisp: attr('boolean'),
  dataElementExpression: attr('string'),

  rule: belongsTo('rule'),

  textMatchesProactiveForm: computed('originalText', 'rule.proactiveForm', function() {
    return this.get('rule.proactiveForm').indexOf(this.get('originalText').trim()) >= 0;
  })
});
