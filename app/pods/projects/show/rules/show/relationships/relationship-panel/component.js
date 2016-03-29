import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['relationship-panel'],

  relatedRule: computed('relationship.ruleOne', 'relationship.ruleTwo', 'rule', function() {
    let relationship = this.get('relationship');

    return relationship.get('ruleOne.id') === this.get('rule.id') ? relationship.get('ruleTwo') : relationship.get('ruleOne');
  })
});
