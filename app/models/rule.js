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
  }),

  relationships: computed('project.ruleRelationships.[]', function() {
    return this.get('project.ruleRelationships').filter((relationship) => {
      return relationship.get('ruleOne.id') === this.get('id') || relationship.get('ruleTwo.id') === this.get('id');
    });
  }),

  dataElements: computed('phrases.@each.dataElements.[]', function() {
    let dataElements = [];

    this.get('phrases').forEach((p) => {
      p.get('dataElements').forEach((e) => {
        if (!dataElements.any((d) => d.get('id') === e.get('id'))) {
          dataElements.addObject(e);
        }
      });
    });

    return dataElements;
  })
});
