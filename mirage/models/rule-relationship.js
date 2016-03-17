import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  project: belongsTo('project'),
  ruleOne: belongsTo('rule'),
  ruleTwo: belongsTo('rule')
});
