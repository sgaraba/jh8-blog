import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { ITag } from './blog-management.model';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import TagManagementComponent from './list/tag-management.component';
import { TagManagementDetailComponent } from './detail/tag-management-detail.component';
import { TagManagementService } from './service/tag-management.service';
import TagManagementUpdateComponent from './update/tag-management-update.component';

export const BlogManagementResolve: ResolveFn<ITag | null> = (route: ActivatedRouteSnapshot) => {
  const login = route.paramMap.get('id');
  if (login) {
    return inject(TagManagementService).find(login);
  }
  return of(null);
};

const blogManagementRoute: Routes = [
  {
    path: '',
    component: TagManagementComponent,
    data: {
      defaultSort: 'id,asc',
      breadcrumb: [
        {
          label: 'routes.home',
          url: '../../'
        },
        {
          label: 'routes.tag.tags',
          url: ''
        }
      ]
    }
  },
  {
    path: ':id/view',
    component: TagManagementDetailComponent,
    resolve: {
      tag: BlogManagementResolve
    },
    data: {
      breadcrumb: [
        {
          label: 'routes.home',
          url: '../../../../'
        },
        {
          label: 'routes.tag.tags',
          url: '../../'
        },
        {
          label: 'routes.tag.view',
          url: ''
        }
      ]
    }

  },
  {
    path: 'new',
    component: TagManagementUpdateComponent,
    resolve: {
      tag: BlogManagementResolve
    },
    data: {
      breadcrumb: [
        {
          label: 'routes.home',
          url: '../../../'
        },
        {
          label: 'routes.tag.tags',
          url: '../'
        },
        {
          label: 'routes.tag.create',
          url: ''
        }
      ]
    }
  },
  {
    path: ':id/edit',
    component: TagManagementUpdateComponent,
    resolve: {
      tag: BlogManagementResolve
    },
    data: {
      breadcrumb: [
        {
          label: 'routes.home',
          url: '../../../../'
        },
        {
          label: 'routes.tag.tags',
          url: '../../'
        },
        {
          label: 'routes.tag.update',
          url: ''
        }
      ]
    }
  }
];

export default blogManagementRoute;
