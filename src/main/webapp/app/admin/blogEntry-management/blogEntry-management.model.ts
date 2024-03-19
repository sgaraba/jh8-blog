import { IBlog } from '../blogResource-management/blogResource-management.model';
import { ITag } from '../blog-management/blog-management.model';

export interface IBlogEntry {
  id: number | null;
  title: string | null;
  content: string | null;
  date: string | null;
  blog: IBlog | null;
  tags: ITag[] | null;
}

export class BlogEntry implements IBlogEntry {
  constructor(
    public id: number | null,
    public title: string | null,
    public content: string | null,
    public date: string | null,
    public blog: IBlog | null,
    public tags: ITag[] | null
  ) {
  }
}
