export interface IBlog {
  id : number | null;
  name :string | null;
  handle: string | null;
  user: {
    createdBy: string;
    createdDate: Date;
    lastModifiedBy: string;
    lastModifiedDate: Date;
    id : number | null;
    login: string;
    firstname: string;
    lastname:string;
    email: string;
    activated: boolean;
    langKey: string;
    imageUrl: string;
    resetDate: Date;
  }[] | null;
}

export class Blog implements IBlog {
  constructor(
    public id: number | null,
    public name: string | null,
    public handle: string | null,
    public user: {
      createdBy: string;
      createdDate: Date;
      lastModifiedBy: string;
      lastModifiedDate: Date;
      id : number | null;
      login: string;
      firstname: string;
      lastname:string;
      email: string;
      activated: boolean;
      langKey: string;
      imageUrl: string;
      resetDate: Date;
    }[] | null = []
  ) {}
}
