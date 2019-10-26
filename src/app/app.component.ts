import { MatDialog } from '@angular/material';
import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/internal/operators/filter';

import { BackendService } from '@app/core';
import { environment as env } from '@env/environment';

import { HelpComponent } from './help/help.component';

@Component({
  selector: 'nmhne-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  menu = [
    { title: 'Top', path: 'posts/top' },
    { title: 'New', path: 'posts/new' },
    { title: 'Show', path: 'posts/show' },
    { title: 'Ask', path: 'posts/ask' },
    { title: 'Job', path: 'posts/job' }
  ];
  year = new Date().getFullYear();
  version = env.version;

  @HostBinding('class.dark') isDarkTheme = false;

  constructor(
    private router: Router,
    private titleService: Title,
    private overlayContainer: OverlayContainer,
    public dialog: MatDialog,
    public backendService: BackendService
  ) {}

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

  onHelpClick() {
    this.dialog.open(HelpComponent);
  }

  onDarkThemeClick() {
    this.isDarkTheme = !this.isDarkTheme;
    this.overlayContainer
      .getContainerElement()
      .classList[this.isDarkTheme ? 'add' : 'remove']('dark');
  }
}
