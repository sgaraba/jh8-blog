import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ApplicationConfigService} from "../../../core/config/application-config.service";
import {ITag} from "../blog-management.model";
import {IUser} from "../../user-management/user-management.model";
import {Pagination} from "../../../core/request/request.model";
import {createRequestOption} from "../../../core/request/request-util";

@Injectable({
  providedIn: 'root'
})
export class TagManagementService {
  private resourceUrl = this.applicationConfigService.getEndpointFor('api/tags')
  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService,
  ) { }

  create(tag: ITag): Observable<ITag> {
    return this.http.post<ITag>(this.resourceUrl, tag);
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
