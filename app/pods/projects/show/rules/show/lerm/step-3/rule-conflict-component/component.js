import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  init(...args) {
    this.set('isEditing', this.get('conflict.isNew'));

    return this._super(...args);
  },

  showDeleteModal: false,

  conflictOptions: computed('rule.project.rules.[]', function() {
    return this.get('rule.project.rules').filter((rule) => {
      return rule.get('id') !== this.get('rule.id');
    });
  }),

  conflictingRule: computed('conflict.ruleOne', 'conflict.ruleTwo', 'rule', {
    get() {
      let conflict = this.get('conflict');
      let ruleId = this.get('rule.id');

      return conflict.get('ruleOne.id') === ruleId ? conflict.get('ruleTwo') : conflict.get('ruleOne');
    },
    set(key, value) {
      let conflict = this.get('conflict');
      let ruleId = this.get('rule.id');

      if (conflict.get('ruleOne.id') === ruleId) {
        conflict.set('ruleTwo', value);
      } else {
        conflict.set('ruleOne', value);
      }

      return value;
    }
  }),

  actions: {
    startEditing() {
      this.set('isEditing', true);
    },

    stopEditing() {
      this.get('conflict').rollbackAttributes();
      this.set('isEditing', false);
    },

    changeConflictingRule(rule) {
      this.set('conflictingRule', rule);
    },

    toggleDeleteModal() {
      this.toggleProperty('showDeleteModal');
    },

    saveConflict() {
      if (this.get('conflictingRule.content') === null) {
        this.set('conflictingRuleError', 'conflicting rule - cannot be blank');
      } else {
        this.set('conflictingRuleError', null);

        this.get('saveTask').perform(this.get('conflict')).then(() => {
          this.set('isEditing', false);
        });
      }
    }
  }
});
