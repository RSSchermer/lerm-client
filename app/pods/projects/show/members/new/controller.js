import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Controller, inject, computed } = Ember;
const { alias } = computed;

export default Controller.extend({
  flashMessages: inject.service(),

  project: alias('model'),

  addProjectMemberTask: task(function *() {
    let project = this.get('project');
    let users = yield this.store.query('user', {
      filter: { email: this.get('email') },
      include: 'memberships.project'
    });
    let user = users.get('firstObject');

    if (!user) {
      this.set('error', 'no user exists for this e-mail');
    } else {
      let memberships = yield user.get('memberships');

      if (memberships.any((m) => m.get('project.id') === project.get('id'))) {
        this.set('error', 'this user is already a project member');
      } else {
        let membership = this.store.createRecord('membership', { user, project });

        yield membership.save();

        this.get('flashMessages').success('The member was added successfully.');
        this.transitionToRoute('projects.show.members.index', project);
      }
    }
  }).drop()
});
