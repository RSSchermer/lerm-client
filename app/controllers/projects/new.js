import Ember from 'ember';

const { Controller, inject, run } = Ember;

export default Controller.extend({
  flashMessages: inject.service(),

  session: inject.service(),

  actions: {
    submit() {
      this.get('model').save().then((project) => {
        // The server automatically creates a membership for the current user.
        // Reload the current user's memberships to sync.
        // TODO: see if there's an clean way to include the created relationship in
        // the response created by the server and remove this workaround.
        run(() => {
          this.get('session.currentUser.memberships').reload();
        });

        this.get('flashMessages').success('The project was created successfully.');
        this.transitionToRoute('projects.show', project.id);
      });
    }
  }
});
