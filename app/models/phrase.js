import DS from 'ember-data';
import Ember from 'ember';

const { Model, attr, belongsTo, hasMany } = DS;
const { computed } = Ember;

export default Model.extend({
  originalText: attr('string'),
  cleanedText: attr('string'),
  discarded: attr('boolean'),
  crisp: attr('boolean'),
  dataElementExpression: attr('string'),

  rule: belongsTo('rule'),
  dataElements: hasMany('data-element'),

  text: computed('originalText', 'cleanedText', function() {
    return this.get('cleanedText') || this.get('originalText');
  }),

  textMatchesProactiveForm: computed('originalText', 'rule.proactiveForm', function() {
    return this.get('rule.proactiveForm').indexOf(this.get('originalText').trim()) >= 0;
  }),

  defaultDataElementExpression: computed('dataElements.@each.label', function() {
    let dataElements = this.get('dataElements');
    let count = dataElements.get('length');

    if (count === 0) {
      return null;
    } else if (count === 1) {
      return dataElements.get('firstObject.label');
    } else {
      let expression = dataElements.reduce((s, e) => s === null ? e.get('label') : `${s} OR ${e.get('label')}`, null);

      return `(${expression})`;
    }
  })
});
