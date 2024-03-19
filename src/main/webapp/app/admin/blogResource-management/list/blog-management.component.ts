import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import SharedModule from '../../../shared/shared.module';
import { SortByDirective, SortDirective } from '../../../shared/sort';
import { ItemCountComponent } from '../../../shared/pagination';
import { Blog } from '../blogResource-management.model';
import { Account } from '../../../core/auth/account.model';
import { BlogManagementService } from '../service/blog-management.service';
import { AccountService } from '../../../core/auth/account.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ASC, DESC, SORT } from '../../../config/navigation.constants';
import { combineLatest } from 'rxjs';
import { BlogManagementDeleteComponent } from '../delete/blog-management-delete.component';
import { NgDynamicBreadcrumbComponent } from '../../../lib/ng-dynamic-breadcrumb.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'jhi-list',
  standalone: true,
  imports: [RouterModule, SharedModule, SortDirective, SortByDirective, ItemCountComponent, NgDynamicBreadcrumbComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './blog-management.component.html',
  styleUrl: './blog-management.component.scss'
})
export default class BlogManagementComponent implements OnInit {
  blogs: Blog[] | null = null;
  isLoading = false;
  currentAccount: Account | null = null;
  totalItems = 0;
  itemsPerPage: number = 10;
  itemsPerPageOptions: number[] = [10, 25, 50];
  page!: number;
  predicate!: string;
  ascending!: boolean;

  constructor(
    private blogService: BlogManagementService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => (this.currentAccount = account));
    this.handleNavigation();
  }

  private onSuccess(blogs: Blog[] | null, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.blogs = blogs;
  }

  private sort(): string[] {
    const result = [`${this.predicate},${this.ascending ? ASC : DESC}`];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  updatePageSize() {
    this.itemsPerPage = Number((document.getElementById('itemsPerPageSelect') as HTMLSelectElement).value);
    this.loadAll();
  }

  loadAll(): void {
    this.isLoading = true;
    this.blogService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe({
        next: (res: HttpResponse<Blog[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers);
        },
        error: () => (this.isLoading = false)
      });
  }

  deleteBlog(blog: Blog): void {
    const modalRef = this.modalService.open(BlogManagementDeleteComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.blog = blog;
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }

  transition(): void {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        page: this.page,
        sort: `${this.predicate},${this.ascending ? ASC : DESC}`
      }
    });
  }

  trackIdentity(_index: number, item: Blog): number {
    return item.id!;
  }

  private handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = params.get('page');
      this.page = +(page ?? 1);
      const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
      this.predicate = sort[0];
      this.ascending = sort[1] === ASC;
      this.loadAll();
    });
  }

}
