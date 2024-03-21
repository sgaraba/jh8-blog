import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { NgDynamicBreadcrumbComponent } from '../lib/ng-dynamic-breadcrumb.component';
import { SupersetService } from './superset.service';

@Component({
  standalone: true,
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [SharedModule, RouterModule, NgDynamicBreadcrumbComponent]
})
export default class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private accountService: AccountService,
    private router: Router,
    private elementRef: ElementRef,
    private embedService: SupersetService
  ) {
  }

  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));
    this.embedSupersetDashboard();
  }

  embedSupersetDashboard(): void {
    const dashboardElement = this.elementRef.nativeElement.querySelector('#dashboard');

    if (dashboardElement) {
      this.embedService.embedDashboard().subscribe(
        () => {
          const iframe = dashboardElement.querySelector('iframe');
          if (iframe) {
            iframe.style.width = '100%'; // Set the width as needed
            iframe.style.height = '500px'; // Set the height as needed
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
