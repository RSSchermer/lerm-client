import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['conflict-panel'],

  conflictingRule: computed('conflict.ruleOne', 'conflict.ruleTwo', 'rule', function() {
    let conflict = this.get('conflict');

    return conflict.get('ruleOne.id') === this.get('rule.id') ? conflict.get('ruleTwo') : conflict.get('ruleOne');
  })
});
