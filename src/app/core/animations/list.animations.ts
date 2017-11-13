import {
  animate,
  query,
  style,
  transition,
  trigger,
  group
} from '@angular/animations';

export const listTransitions = trigger('listTransitions', [
  transition('* <=> *', [
    query(
      '@listTransitions > :enter',
      group([
        style({ maxHeight: '0px', opacity: 0 }),
        animate('0.5s ease-in-out', style({ maxHeight: '5000px', opacity: 1 }))
      ]),
      { optional: true }
    )
  ])
]);
