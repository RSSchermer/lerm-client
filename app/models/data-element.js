import DS from 'ember-data';

const { Model, attr, belongsTo, hasMany } = DS;

export default Model.extend({
  label: attr('string'),
  description: attr('string'),

  project: belongsTo('project'),
  phrases: hasMany('phrase')
});
