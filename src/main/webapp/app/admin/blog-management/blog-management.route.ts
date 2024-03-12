import {UserManagementService} from "../user-management/service/user-management.service";
import {ActivatedRouteSnapshot, ResolveFn, Routes } from "@angular/router";
import {ITag} from "./blog-management.model";
import { inject } from "@angular/core";
import { of } from 'rxjs';
import {TagManagementComponent} from "./list/tag-management/tag-management.component";

// export const BlogManagementResolve: ResolveFn<ITag | null> = (route: ActivatedRouteSnapshot) => {
//   const login = route.paramMap.get('login');
//   if (login) {
//     return inject(UserManagementService).find(login);
//   }
//   return of(null);
// };

const blogManagementRoute : Routes = [
  {
    path: '',
    component: TagManagementComponent,
    data: {
      defaultSort: 'id,asc',
    },
  }
]

export default blogManagementRoute;
