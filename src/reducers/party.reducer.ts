export interface Party {
  id: string;
  name: string;
  users: string[];
  circle: string;
  creator: string;
}

export const enum PartyActionEmun {
  CREATE_PARTY = 'CREATE_PARTY',
  READ_PARTIES = 'READ_PARTIES',
  UPDATE_PARTY = 'UPDATE_PARTY',
  DELETE_PARTY = 'DELETE_PARTY',
}

export type PartyAction =
  | { type: PartyActionEmun.READ_PARTIES; payload: Party[] }
  | { type: PartyActionEmun.CREATE_PARTY; payload: Party }
  | { type: PartyActionEmun.UPDATE_PARTY; payload: Party }
  | { type: PartyActionEmun.DELETE_PARTY; payload: string };

export const partyReducer = (parties: Party[], action: PartyAction): Party[] => {
  switch (action.type) {
    case PartyActionEmun.READ_PARTIES:
      return parties;
    case PartyActionEmun.CREATE_PARTY:
      return [...parties, action.payload];

    case PartyActionEmun.UPDATE_PARTY:
      return [...parties?.filter((u) => u.id !== action.payload.id), action.payload];

    case PartyActionEmun.DELETE_PARTY:
      return [...parties?.filter((u) => u.id !== action.payload)];

    default:
      return parties;
  }
};
