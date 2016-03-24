import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  rule: belongsTo('rule'),
  dataElements: hasMany('data-element')
});
