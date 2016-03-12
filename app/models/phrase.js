import DS from 'ember-data';
import Ember from 'ember';

const { Model, attr, belongsTo } = DS;
const { computed } = Ember;

export default Model.extend({
  text: attr('string'),
  cleanedText: attr('string'),
  discarded: attr('boolean'),
  crisp: attr('boolean'),
  dataElementExpression: attr('string'),

  rule: belongsTo('rule'),

  textMatchesProactiveForm: computed('text', 'rule.proactiveForm', function() {
    return this.get('rule.proactiveForm').indexOf(this.get('text').trim()) >= 0;
  })
});
