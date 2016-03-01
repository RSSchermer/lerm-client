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
}
