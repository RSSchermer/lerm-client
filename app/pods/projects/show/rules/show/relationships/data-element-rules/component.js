import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  rules: computed('dataElement.rules.[]', 'rule', function() {
    return this.get('dataElement.rules').filter((r) => r.get('id') !== this.get('rule.id'));
  })
});
