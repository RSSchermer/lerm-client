import DS from 'ember-data';
import Ember from 'ember';

const { Model, attr, belongsTo, hasMany } = DS;
const { computed } = Ember;

export default Model.extend({
  label: attr('string'),
  source: attr('string'),
  originalText: attr('string'),
  proactiveForm: attr('string'),

  project: belongsTo('project'),
  phrases: hasMany('phrase'),
  statements: hasMany('statement'),

  conflicts: computed('project.ruleConflicts.[]', function() {
    return this.get('project.ruleConflicts').filter((conflict) => {
      return conflict.get('ruleOne.id') === this.get('id') || conflict.get('ruleTwo.id') === this.get('id');
    });
  })
});
