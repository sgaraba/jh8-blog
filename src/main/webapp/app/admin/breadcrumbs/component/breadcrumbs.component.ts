import { Component } from '@angular/core';
import { BreadcrumbsService } from '../service/breadcrumbs.service';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'jhi-component',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent {
  breadcrumbItems: { label: string, url: string }[] = [];

  constructor(private breadcrumbService: BreadcrumbsService) {
  }

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbItems$.subscribe(items => {
      this.breadcrumbItems = items;
    });
  }
}
