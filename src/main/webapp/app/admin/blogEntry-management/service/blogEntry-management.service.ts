import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApplicationConfigService } from '../../../core/config/application-config.service';
import { Observable } from 'rxjs';
import { BlogEntry, IBlogEntry } from '../blogEntry-management.model';
import { Pagination } from '../../../core/request/request.model';
import { createRequestOption } from '../../../core/request/request-util';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogEntryManagementService {
  private resourceUrl = this.applicationConfigService.getEndpointFor('api/blog-entries');

  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService
  ) {
  }

  query(req?: Pagination): Observable<HttpResponse<IBlogEntry[]>> {
    const options = createRequestOption(req);
    return this.http.get<IBlogEntry[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  create(blogEntry: BlogEntry): Observable<BlogEntry> {
    return this.http.post<BlogEntry>(this.resourceUrl, blogEntry);
  }

  delete(id: number): Observable<{}> {
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }

  find(id: string): Observable<IBlogEntry> {
    return this.http.get<IBlogEntry>(`${this.resourceUrl}/${id}`).pipe(
      tap((result) => console.log('Result:', result)));
  }
}
