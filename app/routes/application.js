import Ember from 'ember';
import AuthApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { Route } = Ember;

export default Route.extend(AuthApplicationRouteMixin, {
  actions: {
    unauthorized() {
      this.render('unauthorized');
    }
  }
});
