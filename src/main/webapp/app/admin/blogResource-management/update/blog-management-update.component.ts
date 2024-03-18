import { Component, OnInit } from '@angular/core';
import { IBlog, User } from '../blogResource-management.model';
import SharedModule from '../../../shared/shared.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogManagementService } from '../service/blog-management.service';
import { ActivatedRoute } from '@angular/router';

const blogTemplate: IBlog = {} as IBlog;
const newBlog: IBlog = {} as IBlog;

@Component({
  selector: 'jhi-update',
  standalone: true,
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
  templateUrl: './blog-management-update.component.html',
  styleUrl: './blog-management-update.component.scss'
})
export default class BlogManagementUpdateComponent implements OnInit{
  authorities: string[] = [];
  isSaving = false;

  editForm = new FormGroup({
    id: new FormControl(blogTemplate.id),
    name: new FormControl(blogTemplate.name, {validators: [Validators.maxLength(40)]}),
    handle: new FormControl(blogTemplate.handle),
    user: new FormControl<null | { login: string }>(null)
  });

  userValue: User = {login:''};
  constructor(
    private blogService: BlogManagementService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const userString = sessionStorage.getItem('currentUser');
    if (userString) {
      const userObject = JSON.parse(userString);
      const user = { login: userObject.login, id: userObject.id }; // Construct User object
      this.userValue = user;
      this.editForm.get('user')!.setValue(this.userValue);
    }

    this.route.data.subscribe(({blog}) => {
      if(blog) {
        this.editForm.reset(blog);
      } else {
        this.editForm.reset(blog);
      }
    });
  }

  previousState() : void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const blog = this.editForm.getRawValue();
    if (blog.id !== null) {
      this.blogService.update(blog).subscribe({
        next: () => this.onSaveSuccess(),
        error: () => this.onSaveError(),
      });
    } else{
      this.blogService.create(blog).subscribe({
        next: () => this.onSaveSuccess(),
        error: () => this.onSaveError(),
      })
    }
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError(): void {
    this.isSaving = false;
  }
}
