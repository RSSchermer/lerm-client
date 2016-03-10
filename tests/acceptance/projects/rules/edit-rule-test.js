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

describe('Acceptance - Projects | Rules: Editing a rule', function() {
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

    describe('A rule exists for the project', function() {
      beforeEach(function() {
        this.rule = server.create('rule', {
          label: 'Some Rule',
          projectId: this.project.id
        });
      });

      describe('I am not logged in', function() {
        describe('I visit the page for the rule', function() {
          beforeEach(function() {
            visit(`projects/${this.project.id}/rules/${this.rule.id}`);
          });

          it('does not show a link for editing the rule', function() {
            expect(find('.rule-edit-link').length).to.equal(0);
          });

          describe('I visit the page for editing the rule', function() {
            beforeEach(function() {
              visit(`projects/${this.project.id}/rules/${this.rule.id}/edit`);
            });

            it('redirects me to the login page', function() {
              expect(currentPath()).to.equal('login');
            });
          });
        });
      });

      describe('I am logged as a user who is not a project member', function() {
        beforeEach(function() {
          logIn();
        });

        describe('I visit the page for the rule', function() {
          beforeEach(function() {
            visit(`projects/${this.project.id}/rules/${this.rule.id}`);
          });

          it('does not show a link for editing the rule', function() {
            expect(find('.rule-edit-link').length).to.equal(0);
          });

          describe('I visit the page for editing the rule', function() {
            beforeEach(function() {
              visit(`projects/${this.project.id}/rules/${this.rule.id}/edit`);
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

        describe('I visit the page for the rule', function() {
          beforeEach(function() {
            visit(`projects/${this.project.id}/rules/${this.rule.id}`);
          });

          it('shows a link for editing the rule', function() {
            expect(find('.rule-edit-link').length).to.not.equal(0);
          });

          describe('I visit the page for editing the rule', function() {
            beforeEach(function() {
              visit(`projects/${this.project.id}/rules/${this.rule.id}/edit`);
            });

            it('shows a form for editing the rule', function() {
              expect(find('.rule-edit-form').length).to.not.equal(0);
            });

            describe('I fill out the form with valid rule data', function() {
              beforeEach(function() {
                fillIn('#label', 'New rule label');
                fillIn('#source', 'Some source');
                fillIn('#original_text', 'Some text');
              });

              describe('I leave the page without submitting the form', function() {
                beforeEach(function() {
                  visit('/');
                });

                describe('I visit the page for the rule', function() {
                  beforeEach(function() {
                    visit(`projects/${this.project.id}/rules/${this.rule.id}`);
                  });

                  it('shows the old name for the project', function() {
                    expect(find('main').text()).to.contain('Some Rule');
                  });
                });
              });

              describe('I submit the form', function() {
                beforeEach(function() {
                  click('.rule-edit-form .btn-primary');
                });

                it('transitions to the rules\'s overview page', function() {
                  expect(currentPath()).to.equal('projects.show.rules.show.lerm.step-1');
                });

                it('displays a flash message indicating that the new project was updated successfully', function() {
                  expect(find('main').text()).to.contain('The rule was updated successfully');
                });

                it('shows the updated name for the project', function() {
                  expect(find('main').text()).to.contain('New rule label');
                });
              });
            });
          });
        });
      });
    });
  });
});
