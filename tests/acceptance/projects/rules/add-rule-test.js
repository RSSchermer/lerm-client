/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../../../helpers/start-app';
import destroyApp from '../../../helpers/destroy-app';

describe('Acceptance - Projects | Rules: adding a rule to a project', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  describe('A project exists', function() {
    beforeEach(function() {
      this.project = server.create('project', { name: 'Some project' });
    });

    describe('I am not logged in', function() {
      describe('I visit the page for listing the rules of the project', function() {
        beforeEach(function() {
          visit(`/projects/${this.project.id}/rules`);
        });

        it('does not show a link for adding a rule to the project', function() {
          expect(find('.add-rule-link').length).to.equal(0);
        });

        describe('I visit the page for adding a rule to the project', function() {
          beforeEach(function() {
            visit(`/projects/${this.project.id}/rules/new`);
          });

          it('redirects me to the login page', function() {
            expect(currentURL()).to.equal('/login');
          });
        });
      });
    });

    describe('I am logged as a user who is not a project member', function() {
      beforeEach(function() {
        logIn();
      });

      describe('I visit the page for listing the rules of the project', function() {
        beforeEach(function() {
          visit(`/projects/${this.project.id}/rules`);
        });

        it('does not show a link for adding a rule to the project', function() {
          expect(find('.add-rule-link').length).to.equal(0);
        });

        describe('I visit the page for adding a rule to the project', function() {
          beforeEach(function() {
            visit(`/projects/${this.project.id}/rules/new`);
          });

          it('tells me I am not authorized to open this page', function() {
            expect(find('h1').text()).to.contain('Unauthorized');
          });
        });
      });
    });

    describe('I am logged as a user who is a project member', function() {
      beforeEach(function() {
        this.currentUser = server.create('user');
        server.create('membership', { userId: this.currentUser.id, projectId: this.project.id });
        logIn(this.currentUser);
      });

      describe('I visit the page for the listing the rules of the project', function() {
        beforeEach(function() {
          visit(`/projects/${this.project.id}/rules`);
        });

        it('shows a link for adding a rule the project', function() {
          expect(find('.add-rule-link').length).to.not.equal(0);
        });

        describe('I visit the page for adding a rule to the project', function() {
          beforeEach(function() {
            visit(`/projects/${this.project.id}/rules/new`);
          });

          it('shows a form for editing adding a rule', function() {
            expect(find('.add-rule-form').length).to.not.equal(0);
          });

          describe('I fill in the form with valid data', function() {
            beforeEach(function() {
              fillIn('#label', 'Some Rule');
              fillIn('#source', 'Some Source');
              fillIn('#original_text', 'Some Text');
            });

            describe('I click the button the add the rule', function() {
              beforeEach(function() {
                click('.add-rule-form .btn-primary');
              });

              it('redirects me to a page for showing the rule', function() {
                expect(currentPath()).to.contain('projects.show.rules.show');
              });

              it('it displays a flash message indicating that the rule was added successfully', function() {
                expect(find('main').text()).to.contain('The rule was added successfully');
              });

              it('shows the correct rule label', function() {
                expect(find('h2').text()).to.contain('Some Rule');
              });
            });
          });
        });
      });
    });
  });
});
