import { Component, OnInit } from '@angular/core';
import SharedModule from '../../../shared/shared.module';
import { Blog } from '../blogResource-management.model';
import { ActivatedRoute } from '@angular/router';
import { BlogEntryManagementService } from '../../blogEntry-management/service/blogEntry-management.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  BlogEntryManagementCreateComponent
} from '../../blogEntry-management/createModal/blog-entry-management-create.component';

@Component({
  selector: 'jhi-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './blog-management-detail.component.html',
  styleUrl: './blog-management-detail.component.scss'
})
export class BlogManagementDetailComponent implements OnInit {
  blog: Blog | null = null;

  constructor(
    private route: ActivatedRoute,
    private blogEntriesService: BlogEntryManagementService,
    private modalService: NgbModal
  ) {
  }

  createBlogEntry(blog: Blog): void {
    const modalRef = this.modalService.open(BlogEntryManagementCreateComponent, {
      size: 'xl',
      backdrop: 'static'
    });
    modalRef.componentInstance.blog = blog;
    modalRef.closed.subscribe(reason => {
      if (reason === 'created') {
        this.blogEntriesService.query();
      }
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(({ blog }) => {
      this.blog = blog;
    });
  }
}
