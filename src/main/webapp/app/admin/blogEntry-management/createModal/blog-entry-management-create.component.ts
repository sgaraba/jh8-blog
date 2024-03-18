import { Component, Input } from '@angular/core';
import { BlogEntry, IBlogEntry } from '../blogEntry-management.model';
import { AlertErrorComponent } from '../../../shared/alert/alert-error.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { BlogEntryManagementService } from '../service/blogEntry-management.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import SharedModule from '../../../shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { Tag } from '../../blog-management/blog-management.model';
import { TagManagementService } from '../../blog-management/service/tag-management.service';
import { HttpHeaders } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';

const blogEntryTemplate: IBlogEntry = {} as IBlogEntry;
const newBlogEntry: IBlogEntry = {} as IBlogEntry;

@Component({
  selector: 'jhi-createModal',
  standalone: true,
  imports: [AlertErrorComponent, SharedModule, ReactiveFormsModule, FaIconComponent, FormsModule, NgSelectModule],
  templateUrl: './blog-entry-management-create.component.html',
  styleUrl: './blog-entry-management-create.component.scss'
})
export class BlogEntryManagementCreateComponent {
  blogEntry?: BlogEntry;
  isSaving = false;
  currentDateTime = '';
  tags: Tag[] | null = [];
  totalItems = 0;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  @Input() blog: any;
  selectedTags: any[] = [];

  createForm = new FormGroup({
    id: new FormControl(blogEntryTemplate.id),
    title: new FormControl(blogEntryTemplate.title),
    content: new FormControl(blogEntryTemplate.content),
    blog: new FormControl(blogEntryTemplate.blog),
    date: new FormControl(blogEntryTemplate.date),
    tags: new FormControl(blogEntryTemplate.tags)
  });

  constructor(
    private blogEntryService: BlogEntryManagementService,
    private activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private tagService: TagManagementService
  ) {

  }

  ngOnInit(): void {
    this.loadTags();
    this.route.data.subscribe(({ blogEntry }) => {
      if (blogEntry) {
        this.createForm.reset(blogEntry);
      }
    });
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  private onSuccess(tags: Tag[] | null, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.tags = tags;
  }

  loadTags(): void {
    this.tagService.query().subscribe(
      (response) => {
        this.onSuccess(response.body, response.headers);
      },
      (error) => {
        console.error('Error fetching tags: ', error);
      }
    );
  }

  previousState(): void {
    window.history.back();
  };

  save(): void {
    this.isSaving = true;
    const blogEntry = this.createForm.getRawValue();
    const selectedTagsIds: any[] | null = this.createForm.get('tags')!.value;
    const selectedTags = this.tags!.filter(tag => selectedTagsIds!.includes(tag.id!));
    const currentDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    blogEntry.date = currentDate;
    blogEntry.blog = this.blog;
    blogEntry.tags = selectedTags;
    console.log('selected tags', this.selectedTags);

    this.blogEntryService.create(blogEntry).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError
    });
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
    this.cancel();
  }

  private onSaveError(): void {
    this.isSaving = false;
  }

}
