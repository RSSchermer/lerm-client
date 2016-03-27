import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  init(...args) {
    this.set('isEditing', this.get('relationship.isNew'));

    return this._super(...args);
  },

  showDeleteModal: false,

  relationshipOptions: computed('rule.project.rules.[]', function() {
    return this.get('rule.project.rules').filter((rule) => {
      return rule.get('id') !== this.get('rule.id');
    });
  }),

  relatedRule: computed('relationship.ruleOne', 'relationship.ruleTwo', 'rule', {
    get() {
      let relationship = this.get('relationship');
      let ruleId = this.get('rule.id');

      return relationship.get('ruleOne.id') === ruleId ? relationship.get('ruleTwo') : relationship.get('ruleOne');
    },
    set(key, value) {
      let relationship = this.get('relationship');
      let ruleId = this.get('rule.id');

      if (relationship.get('ruleOne.id') === ruleId) {
        relationship.set('ruleTwo', value);
      } else {
        relationship.set('ruleOne', value);
      }

      return value;
    }
  }),

  actions: {
    startEditing() {
      this.set('isEditing', true);
    },

    stopEditing() {
      this.get('relationship').rollbackAttributes();
      this.set('isEditing', false);
    },

    changeRelatedRule(rule) {
      this.set('relatedRule', rule);
    },

    toggleDeleteModal() {
      this.toggleProperty('showDeleteModal');
    },

    saveRelationship() {
      if (this.get('relatedRule.content') === null) {
        this.set('relatedRuleError', 'related rule - cannot be blank');
      } else {
        this.set('relatedRuleError', null);

        this.get('saveTask').perform(this.get('relationship')).then(() => {
          this.set('isEditing', false);
        });
      }
    }
  }
});
