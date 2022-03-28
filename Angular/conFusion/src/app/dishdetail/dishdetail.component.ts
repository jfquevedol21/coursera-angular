import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs';
import { Comment } from '../shared/comment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
})
export class DishdetailComponent implements OnInit {
  comment!: Comment;
  commentForm!: FormGroup;
  dish!: Dish;
  dishIds!: string[];
  prev!: string;
  next!: string;

  @ViewChild('fform') commentFormDirective: any;

  formErrors = {
    author: '',
    comment: '',
  };

  validationMessages = {
    author: {
      required: 'Name is required',
      minlength: 'name must be at least 2 characters long',
      maxlength: 'name cannot be more than 25 characters',
    },
    comment: {
      required: 'comment is required',
      minlength: 'comment must be at least 2 characters long',
      maxlength: 'comment cannot be more than 25 characters',
    },
  };

  constructor(
    private dishService: DishService,
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL:string
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.dishService
      .getDishIds()
      .subscribe((dishIds) => (this.dishIds = dishIds));
    this.route.params
      .pipe(
        switchMap((params: Params) => this.dishService.getDish(params['id']))
      )
      .subscribe((dish) => {
        this.dish = dish;
        this.setPrevNext(dish.id);
      });
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      rating: [5, [Validators.required, Validators.max(5)]],
      comment: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(120),
        ],
      ],
    });
    this.commentForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );
    this.onValueChanged(); //reset form validation message
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev =
      this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next =
      this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    console.log(this.comment);
    this.commentForm.reset({
      author: '',
      comment: '',
      rating: 5,
    });
    console.log(this.comment);
    this.comment.date = new Date(5).getDate().toLocaleString();
    this.dish.comments.push(this.comment);
    this.commentFormDirective.resetForm();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;

    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        if (field == 'author') {
          this.formErrors[field] = '';
        }
        if (field == 'comment') {
          this.formErrors[field] = '';
        }

        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          var messages: any;
          if (field == 'author') {
            messages = this.validationMessages[field];
          }
          if (field == 'comment') {
            messages = this.validationMessages[field];
          }

          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              if (field == 'author') {
                this.formErrors[field] += messages[key] + ' ';
              }
              if (field == 'comment') {
                this.formErrors[field] += messages[key] + ' ';
              }
            }
          }
        }
      }
    }
  }
}
