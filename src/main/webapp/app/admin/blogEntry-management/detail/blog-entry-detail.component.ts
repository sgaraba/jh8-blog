import { Component, OnInit } from '@angular/core';
import SharedModule from '../../../shared/shared.module';
import { NgDynamicBreadcrumbComponent } from '../../../lib/ng-dynamic-breadcrumb.component';
import { BlogEntry } from '../blogEntry-management.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-blog-entry-detail',
  standalone: true,
  imports: [SharedModule, NgDynamicBreadcrumbComponent],
  templateUrl: './blog-entry-detail.component.html',
  styleUrl: './blog-entry-detail.component.scss'
})
export class BlogEntryDetailComponent implements OnInit {
  blogEntry: BlogEntry | null = null;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.data.subscribe(({ blogEntry }) => {
      this.blogEntry = blogEntry;
    });
    console.log('BlogEntry', this.blogEntry);
  }
}
