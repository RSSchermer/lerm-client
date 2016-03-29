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

describe('Acceptance - Projects | Rules: changing the formalization status of a rule', function() {
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
            visit(`/projects/${this.project.id}/rules/${this.rule.id}`);
          });

          it('displays a single label', function() {
            expect(find('.formalization-status-section .label').length).to.equal(1);
          });

          it('displays the label for the "Unfinished" status', function() {
            expect(find('.formalization-status-section .label').text()).to.contain('Unfinished');
          });
        });
      });

      describe('I am logged as a user who is not a project member', function() {
        beforeEach(function() {
          logIn();
        });

        describe('I visit the page for the rule', function() {
          beforeEach(function() {
            visit(`/projects/${this.project.id}/rules/${this.rule.id}`);
          });

          it('displays a single label', function() {
            expect(find('.formalization-status-section .label').length).to.equal(1);
          });

          it('displays the label for the "Unfinished" status', function() {
            expect(find('.formalization-status-section .label').text()).to.contain('Unfinished');
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
            visit(`/projects/${this.project.id}/rules/${this.rule.id}`);
          });

          it('displays 4 formalization status labels', function() {
            expect(find('.formalization-status-section .label').length).to.equal(4);
          });

          it('displays the "Unfinished" status label as active', function() {
            expect(find('.formalization-status-section .label:contains("Unfinished")').hasClass('active')).to.be.true;
          });

          it('displays the "Unimplementable" status label as inactive', function() {
            expect(find('.formalization-status-section .label:contains("Unimplementable")').hasClass('inactive')).to.be.true;
          });

          it('displays the "Partially Implemented" status label as inactive', function() {
            expect(find('.formalization-status-section .label:contains("Partially Implemented")').hasClass('inactive')).to.be.true;
          });

          it('displays the "Fully Implemented" status label as inactive', function() {
            expect(find('.formalization-status-section .label:contains("Fully Implemented")').hasClass('inactive')).to.be.true;
          });

          describe('I click the label for the "Unimplementable" status', function() {
            beforeEach(function() {
              click('.formalization-status-section .label:contains("Unimplementable")');
            });

            it('displays the "Unfinished" status label as inactive', function() {
              expect(find('.formalization-status-section .label:contains("Unfinished")').hasClass('inactive')).to.be.true;
            });

            it('displays the "Unimplementable" status label as active', function() {
              expect(find('.formalization-status-section .label:contains("Unimplementable")').hasClass('active')).to.be.true;
            });

            it('displays the "Partially Implemented" status label as inactive', function() {
              expect(find('.formalization-status-section .label:contains("Partially Implemented")').hasClass('inactive')).to.be.true;
            });

            it('displays the "Fully Implemented" status label as inactive', function() {
              expect(find('.formalization-status-section .label:contains("Fully Implemented")').hasClass('inactive')).to.be.true;
            });
          });

          describe('I click the label for the "Partially Implemented" status', function() {
            beforeEach(function() {
              click('.formalization-status-section .label:contains("Partially Implemented")');
            });

            it('displays the "Unfinished" status label as inactive', function() {
              expect(find('.formalization-status-section .label:contains("Unfinished")').hasClass('inactive')).to.be.true;
            });

            it('displays the "Unimplementable" status label as inactive', function() {
              expect(find('.formalization-status-section .label:contains("Unimplementable")').hasClass('inactive')).to.be.true;
            });

            it('displays the "Partially Implemented" status label as active', function() {
              expect(find('.formalization-status-section .label:contains("Partially Implemented")').hasClass('active')).to.be.true;
            });

            it('displays the "Fully Implemented" status label as inactive', function() {
              expect(find('.formalization-status-section .label:contains("Fully Implemented")').hasClass('inactive')).to.be.true;
            });
          });

          describe('I click the label for the "Fully Implemented" status', function() {
            beforeEach(function() {
              click('.formalization-status-section .label:contains("Fully Implemented")');
            });

            it('displays the "Unfinished" status label as inactive', function() {
              expect(find('.formalization-status-section .label:contains("Unfinished")').hasClass('inactive')).to.be.true;
            });

            it('displays the "Unimplementable" status label as inactive', function() {
              expect(find('.formalization-status-section .label:contains("Unimplementable")').hasClass('inactive')).to.be.true;
            });

            it('displays the "Partially Implemented" status label as inactive', function() {
              expect(find('.formalization-status-section .label:contains("Partially Implemented")').hasClass('inactive')).to.be.true;
            });

            it('displays the "Fully Implemented" status label as active', function() {
              expect(find('.formalization-status-section .label:contains("Fully Implemented")').hasClass('active')).to.be.true;
            });
          });
        });
      });
    });
  });
});
