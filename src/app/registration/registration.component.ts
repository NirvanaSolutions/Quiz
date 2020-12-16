import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailRegex } from '../global';
import { RegistrationService } from '../registration-service/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @ViewChild("firstName") private firstName: ElementRef;
  public registrationForm: FormGroup;
  public formControls: any;
  public isSubmitted: Boolean = false;
  constructor(private fb: FormBuilder, private router: Router, private registerService: RegistrationService) { }

  ngOnInit(): void {
    localStorage.clear();
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    this.firstName.nativeElement.focus();
  }

  /**
   * @method initializeForm
   */
  public initializeForm() {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailID: ['', [Validators.required, Validators.pattern(emailRegex)]],
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      experience: ['', Validators.required]
    });
    this.formControls = this.registrationForm.controls;
  }


  /**
   * @method onSubmit
   */
  public onSubmit(value, valid) {
    this.isSubmitted = true;
    if(!valid) {
      return;
    }
    let request = value;
    this.registerService.submitRegistration(request).subscribe(response => {
      localStorage.setItem('userRegistration', value);
      this.isSubmitted = false;
      this.router.navigate(['/quiz']);
    });
  }

  /**
   * @method clearForm
   */
  public clearForm() {
    this.initializeForm();
  }

  /**
   * @method checkExperience
   */
  public checkExperience() {
    if (this.registrationForm.value.experience > 5 && this.registrationForm.value.experience < 2) {
      this.formControls.experience.setValidators({'minMax': true});
    } else {
      this.formControls.experience.setValidators({'minMax': false});
    }
  }

}
