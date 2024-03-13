export interface ITag {
  id : number | null;
  name :string | null;
  entries: {
    id : number | null;
    title: string;
    content: string
    date: Date;
  }[] | null;
}

export class Tag implements ITag {
  constructor(
    public id: number | null,
    public name: string | null,
    public entries: {
      id: number | null;
      title: string;
      content: string;
      date: Date;
    }[] | null = []
  ) {}
}
