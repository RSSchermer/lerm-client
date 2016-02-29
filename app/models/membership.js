import DS from 'ember-data';

const { Model, belongsTo } = DS;

export default Model.extend({
  project: belongsTo('project'),
  user: belongsTo('user')
});
