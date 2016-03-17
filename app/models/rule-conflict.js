import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  description: attr('string'),

  project: belongsTo('project'),
  ruleOne: belongsTo('rule'),
  ruleTwo: belongsTo('rule')
});
