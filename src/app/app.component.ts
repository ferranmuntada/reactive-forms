import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'reactive-forms';

  userForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adress: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
      }),
      phoneNumbers: this.fb.array([
        this.fb.control('', [
          Validators.required,
          Validators.pattern(/^\d{10}$/),
        ]),
      ]),
    });
  }

  get phoneNumbers() {
    return this.userForm.get('phoneNumbers') as FormArray;
  }

  addPhoneNumber() {
    this.phoneNumbers.push(
      this.fb.control('', [Validators.required, Validators.pattern(/^\d{10}$/)])
    );
  }

  removePhoneNumber(index: number) {
    this.phoneNumbers.removeAt(index);
  }

  submitForm() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
  }

  isInvalid(controlName: string, nestedControlName?: string): boolean {
    const control = nestedControlName
      ? this.userForm.get([controlName, nestedControlName])
      : this.userForm.get(controlName);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  isInvalidPhone(index: number): boolean {
    const control = this.phoneNumbers.at(index);
    return control.invalid && (control.dirty || control.touched);
  }
}
