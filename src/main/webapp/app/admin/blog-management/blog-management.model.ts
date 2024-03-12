export interface ITag {
  id : number | null;
  name? :string;
  entries: {
    id : number | null;
    title: string;
    content: string
    date: Date;
  }[]
}

export class Tag implements ITag {
  constructor(
    public id: number | null,
    public name?: string,
    public entries: {
      id: number | null;
      title: string;
      content: string;
      date: Date;
    }[] = []
  ) {}
}
