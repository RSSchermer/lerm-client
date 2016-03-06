import Ember from 'ember';
import AuthApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { Route } = Ember;

export default Route.extend(AuthApplicationRouteMixin, {
  actions: {
    error(error) {
      console.log(error);

      if (error.length && error[0].status === '403') {
        this.render('unauthorized');
      } else {
        this.render('error');
      }
    },

    unauthorized() {
      this.render('unauthorized');
    }
  }
});
