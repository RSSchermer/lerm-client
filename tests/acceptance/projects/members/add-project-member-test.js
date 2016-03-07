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

describe('Acceptance - Projects | Members: adding a member to a project', function() {
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
      describe('I visit the page for listing members of the project', function() {
        beforeEach(function() {
          visit(`projects/${this.project.id}/members`);
        });

        it('does not show a link for adding a member to the project', function() {
          expect(find('.add-member-link').length).to.equal(0);
        });

        describe('I visit the page for adding a member to the project', function() {
          beforeEach(function() {
            visit(`projects/${this.project.id}/members/new`);
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

      describe('I visit the page for listing the members of the project', function() {
        beforeEach(function() {
          visit(`projects/${this.project.id}/members`);
        });

        it('does not show a link for adding a member to the project', function() {
          expect(find('.add-member-link').length).to.equal(0);
        });

        describe('I visit the page for adding a member to the project', function() {
          beforeEach(function() {
            visit(`projects/${this.project.id}/members/new`);
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

      describe('I visit the page for the listing the members of the project', function() {
        beforeEach(function() {
          visit(`projects/${this.project.id}/members`);
        });

        it('shows a link for adding a member to the project', function() {
          expect(find('.add-member-link').length).to.not.equal(0);
        });

        describe('3 users exist (including the current user)', function() {
          beforeEach(function() {
            this.otherUsers = server.createList('user', 2);
          });

          describe('I visit the page for adding a member to the project', function() {
            beforeEach(function() {
              visit(`projects/${this.project.id}/members/new`);
            });

            it('shows a form for editing adding a project member', function() {
              expect(find('.add-member-form').length).to.not.equal(0);
            });

            describe('I fill in an email that has no corresponding user', function() {
              beforeEach(function() {
                fillIn('#email', 'has_no_account@example.com');
              });

              describe('I click the button the add the member', function() {
                beforeEach(function() {
                  click('.add-member-form .btn-primary');
                });

                it('displays an error saying that no user exists for the email', function() {
                  expect(find('.add-member-form').text()).to.contain('no user exists for this e-mail');
                });
              });
            });

            describe('I fill in the email of a user who is already a project member', function() {
              beforeEach(function() {
                fillIn('#email', this.currentUser.email);
              });

              describe('I click the button the add the user', function() {
                beforeEach(function() {
                  click('.add-member-form .btn-primary');
                });

                it('displays an error saying that this user is already a project member', function() {
                  expect(find('.add-member-form').text()).to.contain('this user is already a project member');
                });
              });
            });

            describe('I fill in the email of a user who is not already a project member', function() {
              beforeEach(function() {
                fillIn('#email', this.otherUsers[0].email);
              });

              describe('I click the button the add the user', function() {
                beforeEach(function() {
                  click('.add-member-form .btn-primary');
                });

                it('redirects me to the page listing the members of the project', function() {
                  expect(currentPath()).to.equal('projects.show.members.index');
                });

                it('it displays a flash message indicating that the member was added successfully', function() {
                  expect(find('main').text()).to.contain('The member was added successfully');
                });

                it('lists the user in the member list', function() {
                  expect(find('.project-members-table tbody').text()).to.contain(this.otherUsers[0].username);
                });
              });
            });
          });
        });
      });
    });
  });
});
