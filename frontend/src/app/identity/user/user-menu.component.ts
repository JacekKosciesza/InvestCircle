import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Mode, Language } from './shared';
import { User } from '../shared/user.model';

@Component({
  selector: 'user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent implements OnInit {
  @Input() user: User;
  @Output() logout = new EventEmitter<void>();

  isDarkTheme!: Observable<boolean>;
  mode = Mode.main;
  modeEnum = Mode;
  languages!: Observable<Array<Language>>;
  selectedLanguage!: Observable<Language | undefined>;
  @Output() feedback = new EventEmitter<void>();

  // constructor(private store: Store<State>) {}

  ngOnInit(): void {
    // this.user = this.store.select(s => s.identity.user);
    // this.isDarkTheme = this.store.select(s => s.app.theme).pipe(map(theme => theme === 'dark-theme'));
    this.languages = of([{ locale: 'en-US', name: 'English (US)' }, { locale: 'pl-PL', name: 'Polski' }]);
    // this.selectedLanguage = combineLatest(this.languages, this.store.select(s => s.app.locale)).pipe(
    //   map(([languages, locale]) => languages.find(language => language.locale === locale)),
    // );
  }

  menuClosed(): void {
    this.mode = Mode.main;
  }

  onLogoutClick(): void {
    this.logout.emit();
  }

  sendFeedback(): void {
    this.feedback.emit();
  }

  switchTheme(e: MatSlideToggleChange): void {
    // this.store.dispatch(new SwitchTheme(e.checked ? 'dark-theme' : 'light-theme'));
  }

  isSelectedLanguage(language: Language): Observable<boolean> {
    return this.selectedLanguage.pipe(map(l => l !== undefined && l.locale === language.locale));
  }
}
