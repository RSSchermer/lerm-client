export default function() {
  this.transition(
    this.fromRoute('projects.index'),
    this.toRoute('projects.new'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('projects.index'),
    this.toRoute('projects.show'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('projects.show'),
    this.toRoute('projects.edit'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('projects.show.members.index'),
    this.toRoute('projects.show.members.new'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('projects.show.data-elements.index'),
    this.toRoute('projects.show.data-elements.new'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('projects.show.data-elements.index'),
    this.toRoute('projects.show.data-elements.show'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('projects.show.data-elements.show'),
    this.toRoute('projects.show.data-elements.edit'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('projects.show.rules.index'),
    this.toRoute('projects.show.rules.new'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('projects.show.rules.index'),
    this.toRoute('projects.show.rules.show'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('projects.show.rules.show'),
    this.toRoute('projects.show.rules.edit'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}
