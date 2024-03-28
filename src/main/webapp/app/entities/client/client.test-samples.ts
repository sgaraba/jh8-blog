import { IClient, NewClient } from './client.model';

export const sampleWithRequiredData: IClient = {
  id: 2533,
};

export const sampleWithPartialData: IClient = {
  id: 764,
  firstName: 'Erica',
  lastName: 'Maftei',
};

export const sampleWithFullData: IClient = {
  id: 28268,
  firstName: 'Leontina',
  lastName: 'Maftei',
  email: 'Ancuta6@yahoo.com',
  telephone: '0353524579',
};

export const sampleWithNewData: NewClient = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
