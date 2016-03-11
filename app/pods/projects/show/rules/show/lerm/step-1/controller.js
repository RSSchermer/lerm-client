import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Controller, computed } = Ember;
const { alias } = computed;

export default Controller.extend({
  rule: alias('model'),

  proactiveFormFieldDisabled: computed('isEditing', function() {
    return !this.get('isEditing');
  }),

  saveProactiveFormTask: task(function *() {
    try {
      let rule = this.get('rule');

      rule.set('proactiveForm', this.get('proactiveForm'));

      yield rule.save();

      this.set('isEditing', false);
    } catch (error) {
      this.send('error', error);
    }
  }).drop(),

  actions: {
    startEditing() {
      this.set('isEditing', true);
    },

    stopEditing() {
      this.setProperties({
        proactiveForm: this.get('rule.proactiveForm'),
        isEditing: false
      });
    }
  }
});
