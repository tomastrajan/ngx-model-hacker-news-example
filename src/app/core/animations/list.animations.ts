import {
  animate,
  query,
  style,
  transition,
  trigger,
  stagger
} from '@angular/animations';

export const listTransitions = trigger('listTransitions', [
  transition('* <=> *', [
    query(
      ':enter',
      stagger(100, [
        style({ transform: 'translateY(-10%)', opacity: 0 }),
        animate(
          '0.5s ease-in-out',
          style({ transform: 'translateY(0%)', opacity: 1 })
        )
      ]),
      { optional: true }
    )
  ])
]);
