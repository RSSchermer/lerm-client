import Ember from 'ember';
import { Ability } from 'ember-can';

const { inject, computed } = Ember;

export default Ability.extend({
  can: inject.service(),

  canView: computed('model.project', function() {
    return this.get('can').can('view project', this.get('model.project'));
  }),

  canEdit: computed('model.project', function() {
    return this.get('can').can('edit project', this.get('model.project'));
  }),

  canDestroy: computed('model.project', function() {
    return this.get('can').can('edit project', this.get('model.project'));
  })
});
