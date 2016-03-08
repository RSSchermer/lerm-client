import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  label: attr('string'),
  source: attr('string'),
  originalText: attr('string'),
  proactiveForm: attr('string'),

  project: belongsTo('project')
});
