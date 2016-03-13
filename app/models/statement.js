import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  condition: attr('string'),
  consequence: attr('string'),
  cleanedCondition: attr('string'),
  cleanedConsequence: attr('string'),
  discarded: attr('boolean'),

  rule: belongsTo('rule')
});
