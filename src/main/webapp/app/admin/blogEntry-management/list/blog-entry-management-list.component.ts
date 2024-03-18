import { Component, OnInit } from '@angular/core';
import SharedModule from '../../../shared/shared.module';
import { BlogEntry } from '../blogEntry-management.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SortByDirective, SortDirective } from '../../../shared/sort';
import { ItemCountComponent } from '../../../shared/pagination';
import { Account } from '../../../core/auth/account.model';
import { BlogEntryManagementService } from '../service/blogEntry-management.service';
import { AccountService } from '../../../core/auth/account.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, last } from 'rxjs';
import { ASC, DESC, SORT } from '../../../config/navigation.constants';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'jhi-list',
  standalone: true,
  imports: [RouterModule, SharedModule, SortDirective, SortByDirective, ItemCountComponent, FormsModule],
  templateUrl: './blog-entry-management-list.component.html',
  styleUrl: './blog-entry-management-list.component.scss'
})
export default class BlogEntryManagementListComponent implements OnInit {
  blogEntries: BlogEntry[] | null = null;
  isLoading = false;
  currentAccount: Account | null = null;
  totalItems = 0;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  itemsPerPage: number = 10;
  itemsPerPageOptions: number[] = [10, 25, 50];

  constructor(
    private blogEntryService: BlogEntryManagementService,
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

  private onSuccess(blogEntries: BlogEntry[] | null, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.blogEntries = blogEntries;
  }

  private sort(): string[] {
    const result = [`${this.predicate},${this.ascending ? ASC : DESC}`];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  loadAll(): void {
    this.isLoading = true;
    this.blogEntryService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe({
        next: (res: HttpResponse<BlogEntry[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers);
        },
        error: () => (this.isLoading = false)
      });
  }

  updatePageSize() {
    this.itemsPerPage = Number((document.getElementById('itemsPerPageSelect') as HTMLSelectElement).value);
    this.loadAll();
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

  trackIdentity(_index: number, item: BlogEntry): number {
    return item.id!;
  }

  protected readonly last = last;
}
