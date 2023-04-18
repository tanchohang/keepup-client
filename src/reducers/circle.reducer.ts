export interface Circle {
  id: string;
  users: string[];
}
export const enum CircleActionEmun {
  CREATE_CIRCLE = 'CREATE_CIRCLE',
  READ_CIRCLES = 'READ_CIRCLES',
  UPDATE_CIRCLE = 'UPDATE_CIRCLE',
  DELETE_CIRCLE = 'DELETE_CIRCLE',
}

export type CircleAction =
  | { type: CircleActionEmun.READ_CIRCLES; payload: Circle[] }
  | { type: CircleActionEmun.CREATE_CIRCLE; payload: Circle }
  | { type: CircleActionEmun.UPDATE_CIRCLE; payload: Circle }
  | { type: CircleActionEmun.DELETE_CIRCLE; payload: string };

export const circleReducer = (circle: Circle, action: CircleAction): Circle => {
  switch (action.type) {
    case CircleActionEmun.READ_CIRCLES:
      return circle;
    case CircleActionEmun.CREATE_CIRCLE:
      return circle;

    case CircleActionEmun.UPDATE_CIRCLE:
      return circle;

    case CircleActionEmun.DELETE_CIRCLE:
      return circle;

    default:
      return circle;
  }
};
