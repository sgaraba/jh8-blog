import { Component, OnInit } from '@angular/core';
import {Tag} from "../blog-management.model";
import {Account} from "../../../core/auth/account.model";
import {ITEMS_PER_PAGE} from "../../../config/pagination.constants";
import {TagManagementService} from "../service/tag-management.service";
import {AccountService} from "../../../core/auth/account.service";
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ASC, DESC, SORT} from "../../../config/navigation.constants";
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { combineLatest } from 'rxjs';
import UserManagementDeleteDialogComponent
  from "../../user-management/delete/user-management-delete-dialog.component";
import SharedModule from "../../../shared/shared.module";
import {SortByDirective, SortDirective} from "../../../shared/sort";
import {ItemCountComponent} from "../../../shared/pagination";
import {User} from "../../user-management/user-management.model";
import {TagManagementDeleteComponent} from "../delete/tag-management-delete.component";


@Component({
  selector: 'jhi-tag-management',
  standalone: true,
  imports: [RouterModule, SharedModule, SortDirective, SortByDirective, ItemCountComponent],
  templateUrl: './tag-management.component.html',
  styleUrl: './tag-management.component.scss'
})
export default class TagManagementComponent implements OnInit {
  tags: Tag[] | null = null;
  isLoading = false;
  currentAccount: Account | null = null;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!:boolean;

  constructor(
    private tagService: TagManagementService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => (this.currentAccount = account));
    this.handleNavigation();
  }

  private onSuccess(tags: Tag[] | null, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.tags = tags;
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
    this.tagService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe({
        next: (res: HttpResponse<Tag[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers);
        },
        error: () => (this.isLoading = false),
      });
  }

  deleteTag(tag:Tag): void {
    const modalRef = this.modalService.open(TagManagementDeleteComponent, { size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.tag = tag;
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    })
  }

  transition(): void {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        page: this.page,
        sort: `${this.predicate},${this.ascending ? ASC : DESC}`,
      }
    });
  }

  trackIdentity(_index: number, item: Tag): number {
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
