import {
  animate,
  query,
  style,
  transition,
  trigger,
  stagger,
  keyframes
} from '@angular/animations';

export const listTransitions = trigger('listTransitions', [
  transition('* => *', [
    // Initially the all rows are not visible
    query(':enter', style({ opacity: 0 }), { optional: true }),

    // Each row will appear sequentially with the delay of 300ms
    query(
      ':enter',
      stagger('300ms', [
        animate(
          '.5s ease-in',
          keyframes([
            style({ opacity: 0, transform: 'translateY(-50%)', offset: 0 }),
            style({
              opacity: 0.5,
              transform: 'translateY(-10px) scale(1.1)',
              offset: 0.3
            }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
          ])
        )
      ]),
      { optional: true }
    ),

    // Rows will disappear sequentially with the delay of 300ms
    query(
      ':leave',
      stagger('300ms', [
        animate(
          '500ms ease-out',
          keyframes([
            style({ opacity: 1, transform: 'scale(1.1)', offset: 0 }),
            style({ opacity: 0.5, transform: 'scale(.5)', offset: 0.3 }),
            style({ opacity: 0, transform: 'scale(0)', offset: 1 })
          ])
        )
      ]),
      { optional: true }
    )
  ])
]);
