import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import SharedModule from "../../../shared/shared.module";
import {ITag} from "../blog-management.model";
import {TagManagementService} from "../service/tag-management.service";

const tagTemplate = {} as ITag;
const newTag: ITag = {} as ITag;


@Component({
  selector: 'jhi-update',
  standalone: true,
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tag-management-update.component.html',
  styleUrl: './tag-management-update.component.scss'
})
export default class TagManagementUpdateComponent implements OnInit{
  authorities: string[] = [];
  isSaving = false;

  editForm = new FormGroup({
    id: new FormControl(tagTemplate.id),
    name: new FormControl(tagTemplate.name, {validators: [Validators.maxLength(40)]}),
    entries: new FormControl(tagTemplate.entries),
  });

  constructor(
    private tagService: TagManagementService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(({tag}) => {
      if(tag) {
        this.editForm.reset(tag);
      } else {
        this.editForm.reset(newTag);
      }
    });
  }

  previousState() : void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tag = this.editForm.getRawValue();
    if (tag.id !== null) {
      this.tagService.update(tag).subscribe({
        next: () => this.onSaveSuccess(),
        error: () => this.onSaveError(),
      });
    } else{
      this.tagService.create(tag).subscribe({
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
