import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../../core/logger';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
})
export class AppShellComponent implements OnInit {
  collapsed$: Observable<boolean> = of(true);
  public env = environment;

  constructor(private logger: LoggerService) {}

  ngOnInit(): void {
    this.logger.log('AppComponent');
  }
}
