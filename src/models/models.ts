export interface ILocation {
  lat: number;
  long: number;
}

export interface ServerResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  salary: string;
  address: string;
  benefits: string[];
  location: ILocation;
  pictures: string[];
  createdAt: Date;
  updatedAt: Date;
  description: string;
  employment_type: string[];
}

export interface ICardTheJob {
  key: string;
  id: string;
  title: string;
  pictures: string[];
  name: string;
  createdAt: Date;
}

export interface IContent {
  firstText: string;
  responsopilities: string;
  compensationUndBenefits: string;
}

export interface ILocationJob {
  location: ILocation;
}
