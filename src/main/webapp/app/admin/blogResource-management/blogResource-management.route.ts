import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { IBlog } from './blogResource-management.model';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import BlogManagementComponent from './list/blog-management.component';
import { BlogManagementDetailComponent } from './detail/blog-management-detail.component';
import { BlogManagementService } from './service/blog-management.service';
import BlogManagementUpdateComponent from './update/blog-management-update.component';

export const BlogResourceManagementResolve: ResolveFn<IBlog | null> = (route: ActivatedRouteSnapshot) => {
  const id = route.paramMap.get('id');
  if (id) {
    return inject(BlogManagementService).find(id);
  }
  return of(null);
};

const blogResourceManagementRoute: Routes = [
  {
    path: '',
    component: BlogManagementComponent,
    data: {
      defaultSort: 'id,asc',
      breadcrumb: [
        {
          label: 'routes.home',
          url: '../../'
        },
        {
          label: 'routes.blog.blogs',
          url: ''
        }
      ]
    }

  },
  {
    path: ':id/view',
    component: BlogManagementDetailComponent,
    resolve: {
      blog: BlogResourceManagementResolve
    },
    data: {
      breadcrumb: [
        {
          label: 'routes.home',
          url: '../../../../'
        },
        {
          label: 'routes.blog.blogs',
          url: '../../'
        },
        {
          label: 'routes.blog.view',
          url: ''
        }
      ]
    }
  },
  {
    path: 'new',
    component: BlogManagementUpdateComponent,
    resolve: {
      blog: BlogResourceManagementResolve
    },
    data: {
      breadcrumb: [
        {
          label: 'routes.home',
          url: '../../../'
        },
        {
          label: 'routes.blog.blogs',
          url: '../'
        },
        {
          label: 'routes.blog.create',
          url: ''
        }
      ]
    }
  },
  {
    path: ':id/edit',
    component: BlogManagementUpdateComponent,
    resolve: {
      blog: BlogResourceManagementResolve
    },
    data: {
      breadcrumb: [
        {
          label: 'routes.home',
          url: '../../../../'
        },
        {
          label: 'routes.blog.blogs',
          url: '../../'
        },
        {
          label: 'routes.blog.update',
          url: ''
        }
      ]
    }
  }
];

export default blogResourceManagementRoute;
