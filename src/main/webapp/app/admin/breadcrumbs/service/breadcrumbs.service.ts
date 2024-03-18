import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {
  private breadcrumbItemsSubject = new BehaviorSubject<{ label: string, url: string }[]>([]);
  breadcrumbItems$ = this.breadcrumbItemsSubject.asObservable();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.generateBreadcrumb(this.activatedRoute.root);
      }
    });
  }

  private generateBreadcrumb(route: ActivatedRoute | null, url: string = '', breadcrumbs: {
    label: string,
    url: string
  }[] = []) {
    const children = route?.children;
    if (children && children.length) {
      for (const child of children) {
        const routeUrl = child.snapshot.url.map(segment => segment.path).join('/');
        if (routeUrl !== '') {
          url += `/${routeUrl}`;
        }
        const routeLabel = child.snapshot.data['breadcrumbLabel'];
        if (routeLabel) {
          breadcrumbs.push({ label: routeLabel, url: url });
        }
        this.generateBreadcrumb(child, url, breadcrumbs);
      }
    }
    this.breadcrumbItemsSubject.next(breadcrumbs);
  }
}
