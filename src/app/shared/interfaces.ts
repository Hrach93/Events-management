export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface EventType {
  id?: number;
  name: string;
  description: string;
  date: object;
  eventType: number;
  image?: string;
}

export interface EventsType {
  value: number;
  type: string;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  date: object;
  eventType: number;
  image?: string;
}
