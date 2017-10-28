import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators/filter';

import { environment as env } from '@env/environment';

@Component({
  selector: 'nmhne-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  menu = [
    { title: 'Top', path: 'posts/news' },
    { title: 'New', path: 'posts/newest' },
    { title: 'Show', path: 'posts/show' },
    { title: 'Ask', path: 'posts/ask' },
    { title: 'Job', path: 'posts/job' }
  ];

  constructor(private router: Router, private titleService: Title) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof ActivationEnd))
      .subscribe((event: ActivationEnd) => {
        let lastChild = event.snapshot;
        while (lastChild.children.length) {
          lastChild = lastChild.children[0];
        }
        const { title } = lastChild.data;
        this.titleService.setTitle(
          title ? `${title} - ${env.appName}` : env.appName
        );
      });
  }
}
