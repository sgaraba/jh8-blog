export interface IClient {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  telephone?: string | null;
}

export type NewClient = Omit<IClient, 'id'> & { id: null };
