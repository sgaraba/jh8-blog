export interface User {
  createdBy?: string;
  createdDate?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  id?: number | null;
  login: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  activated?: boolean;
  langKey?: string;
  imageUrl?: string;
  resetDate?: string;
}

export interface IBlog {
  id: number | null;
  name: string | null;
  handle: string | null;
  user: User | null;
}

export class Blog implements IBlog {
  constructor(
    public id: number | null,
    public name: string | null,
    public handle: string | null,
    public user: User | null
  ) {}
}
