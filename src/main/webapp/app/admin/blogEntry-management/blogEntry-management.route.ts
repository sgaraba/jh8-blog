import { Routes } from '@angular/router';
import BlogEntryManagementListComponent from './list/blog-entry-management-list.component';

// export const BlogEntriesManagementResolve: ResolveFn<IBlogEntry | null> = (route: ActivatedRouteSnapshot) => {
//   const login = route.paramMap.get('id');
//   if (login) {
//     return inject(BlogEntryManagementService).find(login);
//   }
//   return of(null);
// }


const blogEntryManagementRoute: Routes = [
  {
    path: '',
    component: BlogEntryManagementListComponent,
    data: {
      defaultSort: 'id,asc',
      breadcrumbLabel: 'Home'
    }
  }
];

export default blogEntryManagementRoute;
