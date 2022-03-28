import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  feedbackForm!: FormGroup;
  feedback!: Feedback;
  contactType = ContactType;

  formErrors = {
    "firstname": '',
    "lastname": '',
    "telnum": '',
    "email": '',
  };

  validationMessages = {
    'firstname': {
      'firstname': 'First name is required',
      'minlength': 'First name must be at least 2 characters long',
      'maxlength': 'First name cannot be more than 25 characters',
    },
    'lastname': {
      'lastname': 'last name is required',
      'minlength': 'last name must be at least 2 characters long',
      'maxlength': 'last  name cannot be more than 25 characters',
    },
    'telnum': {
      'required': 'tel. number is required',
      'pattern': 'tel. number must be only numbers',
    },
    'email': {
      'required': 'email is required',
      'email': 'invalid email format',
    },
  };

  @ViewChild('fform') feedbackFormDirective: any;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
        lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: '',
      
    });
    this.feedbackForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );
    this.onValueChanged(); //reset form validation message
  }

  onValueChanged(data?: any){
    if(!this.feedbackForm){
      return;
    }
    const form = this.feedbackForm;
    
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        //clear previous error
        //let loco:string = 'email';
        if(field=='firstname'){
          this.formErrors[field]=''; 
        }
        if(field=='lastname'){
          this.formErrors[field]=''
        }
        if(field=='telnum'){
          this.formErrors[field]=''
        }
        if(field=='email'){
          this.formErrors[field]=''
        }
        const control= form.get(field);
        if(control && control.dirty && !control.valid){
          var messages:any;
          if(field == 'firstname'){  messages = this.validationMessages[field]}
          if(field == 'lastname'){  messages = this.validationMessages[field]}
          if(field == 'telnum'){  messages = this.validationMessages[field]}
          if(field == 'email'){  messages = this.validationMessages[field]}
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              if(field=='firstname'){this.formErrors[field]+=messages[key]+' ';}
              if(field=='lastname'){this.formErrors[field]+=messages[key]+' ';}
              if(field=='telnum'){this.formErrors[field]+=messages[key]+' ';}
              if(field=='email'){this.formErrors[field]+=messages[key]+' ';}
            }
          }
        }
      }
    }
  }
  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: '',
    });
    this.feedbackFormDirective.resetForm();
  }

}
