import Ember from 'ember';

const { Controller, inject } = Ember;

export default Controller.extend({
  session: inject.service(),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
      this.transitionToRoute('login');
    }
  }
});
