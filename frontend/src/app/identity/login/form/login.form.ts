import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'login-form',
  templateUrl: './login.form.html',
  styleUrls: ['./login.form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginForm implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() error: any;
  @Input() loginForm: LoginForm;
  @Output() login = new EventEmitter<LoginForm>();
  @Output() update = new EventEmitter<LoginForm>();
  @ViewChild('emailInput') emailInput: ElementRef;
  form: FormGroup;

  private unsubscribe: Subject<void> = new Subject();

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: false,
    });
  }

  ngOnInit(): void {
    this.emailInput.nativeElement.focus();
  }

  ngAfterViewInit(): void {
    this.form.valueChanges
      .pipe(
        debounceTime(200),
        takeUntil(this.unsubscribe),
      )
      .subscribe(values => {
        this.update.emit(values);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.loginForm) {
      this.form.patchValue(changes.loginForm.currentValue);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.login.emit(this.form.value);
    }
  }

  get emailControl(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
