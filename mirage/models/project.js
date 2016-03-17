import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  memberships: hasMany('membership'),
  dataElements: hasMany('data-element'),
  rules: hasMany('rule'),
  ruleConflicts: hasMany('rule-conflict')
});
