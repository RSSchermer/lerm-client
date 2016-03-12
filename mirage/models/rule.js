import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  project: belongsTo('project'),
  phrases: hasMany('phrase')
});
