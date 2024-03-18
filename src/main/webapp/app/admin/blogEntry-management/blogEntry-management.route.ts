import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import BlogEntryManagementListComponent from './list/blog-entry-management-list.component';
import { IBlogEntry } from './blogEntry-management.model';
import { BlogEntryManagementService } from './service/blogEntry-management.service';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { BlogEntryDetailComponent } from './detail/blog-entry-detail.component';

export const BlogEntriesManagementResolve: ResolveFn<IBlogEntry | null> = (route: ActivatedRouteSnapshot) => {
  const login = route.paramMap.get('id');
  console.log('id', login);
  if (login) {
    return inject(BlogEntryManagementService).find(login);
  }
  return of(null);
};


const blogEntryManagementRoute: Routes = [
  {
    path: '',
    component: BlogEntryManagementListComponent,
    data: {
      defaultSort: 'id,asc',
      breadcrumb: [
        {
          label: 'Home',
          url: '../../'
        },
        {
          label: 'Entry List',
          url: ''
        }
      ]
    }
  },
  {
    path: ':id/view',
    component: BlogEntryDetailComponent,
    resolve: {
      blogEntry: BlogEntriesManagementResolve
    },
    data: {
      breadcrumb: [
        {
          label: 'Home',
          url: '../../../../'
        },
        {
          label: 'Blog entries',
          url: '../../'
        },
        {
          label: 'Blog view',
          url: ''
        }
      ]
    }
  }
];

export default blogEntryManagementRoute;
