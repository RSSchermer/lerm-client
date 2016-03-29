import DS from 'ember-data';
import Ember from 'ember';

const { Model, attr, belongsTo, hasMany } = DS;
const { computed } = Ember;

export default Model.extend({
  label: attr('string'),
  description: attr('string'),

  project: belongsTo('project'),
  phrases: hasMany('phrase'),

  rules: computed('phrases.@each.rule', function() {
    let rules = [];

    this.get('phrases').forEach((p) => {
      if (!rules.any((r) => r.get('id') === p.get('rule.id'))) {
        rules.addObject(p.get('rule'));
      }
    });

    return rules;
  })
});
