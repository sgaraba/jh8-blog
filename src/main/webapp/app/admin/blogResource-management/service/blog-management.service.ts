import { Injectable } from '@angular/core';
import {ApplicationConfigService} from "../../../core/config/application-config.service";
import {Pagination} from "../../../core/request/request.model";
import {createRequestOption} from "../../../core/request/request-util";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBlog } from '../blogResource-management.model';

@Injectable({
  providedIn: 'root'
})
export class BlogManagementService {
  private resourceUrl = this.applicationConfigService.getEndpointFor('api/blogs')
  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService,
  ) { }

  create(blog: IBlog): Observable<IBlog> {
    return this.http.post<IBlog>(this.resourceUrl, blog);
  }

  update(tag: ITag): Observable<ITag> {
    return this.http.put<ITag>(`${this.resourceUrl}/${tag.id}`, tag);
  }

  delete(id: number): Observable<{}> {
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }

  query(req?: Pagination): Observable<HttpResponse<ITag[]>> {
    const options = createRequestOption(req);
    return this.http.get<ITag[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  find(id:string): Observable<ITag> {
    return this.http.get<ITag>(`${this.resourceUrl}/${id}`);
  }

  authorities(): Observable<string[]> {
    return this.http.get<string[]>(this.applicationConfigService.getEndpointFor('api/authorities'));
  }
}
