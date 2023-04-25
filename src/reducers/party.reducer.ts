export interface Party {
  id: string;
  name: string;
  users: string[];
  circle: string;
  creator: string;
}

export const enum PartyActionEmun {
  ADD_PARTY = 'ADD_PARTY',
  FETCH_PARTIES = 'FETCH_PARTIES',
  UPDATE_PARTY = 'UPDATE_PARTY',
  DELETE_PARTY = 'DELETE_PARTY',
}

export type PartyAction =
  | { type: PartyActionEmun.FETCH_PARTIES; payload: Party[] }
  | { type: PartyActionEmun.ADD_PARTY; payload: Party }
  | { type: PartyActionEmun.UPDATE_PARTY; payload: Party }
  | { type: PartyActionEmun.DELETE_PARTY; payload: string };

export const partyReducer = (parties: Party[], action: PartyAction): Party[] => {
  switch (action.type) {
    case PartyActionEmun.FETCH_PARTIES:
      return action.payload;
    case PartyActionEmun.ADD_PARTY:
      return [...parties, action.payload];

    case PartyActionEmun.UPDATE_PARTY:
      return [...parties?.filter((u) => u.id !== action.payload.id), action.payload];

    case PartyActionEmun.DELETE_PARTY:
      return [...parties?.filter((u) => u.id !== action.payload)];

    default:
      return parties;
  }
};
