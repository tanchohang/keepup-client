export interface User {
  id: string;
  fullname: string;
  username: string;
  email: string;
  circle: string;
}

export const enum UserActionEmun {
  CREATE_USER = 'CREATE_USER',
  READ_USERS = 'READ_USERS',
  UPDATE_USER = 'UPDATE_USER',
  DELETE_USER = 'DELETE_USER',
}

export type UserAction =
  | { type: UserActionEmun.READ_USERS; payload: User[] }
  | { type: UserActionEmun.CREATE_USER; payload: User }
  | { type: UserActionEmun.UPDATE_USER; payload: User }
  | { type: UserActionEmun.DELETE_USER; payload: string };

export const userReducer = (users: User[], action: UserAction): User[] => {
  switch (action.type) {
    case UserActionEmun.READ_USERS:
      return users;
    case UserActionEmun.CREATE_USER:
      return [...users, action.payload];

    case UserActionEmun.UPDATE_USER:
      return [...users?.filter((u) => u.id !== action.payload.id), action.payload];

    case UserActionEmun.DELETE_USER:
      return [...users?.filter((u) => u.id !== action.payload)];

    default:
      return users;
  }
};
