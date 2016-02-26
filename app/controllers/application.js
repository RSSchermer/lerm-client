import Ember from 'ember';
import ENV from 'lerm-client/config/environment';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
      this.transitionToRoute('login');
    }
  }
});
