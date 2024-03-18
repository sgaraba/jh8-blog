export interface Entry {
  id : number | null;
  title: string;
  content: string
  date: Date;
}

export interface ITag {
  id : number | null;
  name :string | null;
  entries: Entry[] | null,
}

export class Tag implements ITag {
  constructor(
    public id: number | null,
    public name: string | null,
    public entries: Entry[] | null,
  ) {}
}
