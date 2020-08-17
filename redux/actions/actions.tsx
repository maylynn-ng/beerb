export type Action = {
  type: string;
  payload: string;
};

export function storeBorough(currentBorough: string): Action {
  return {
    type: 'STORE_BOROUGH',
    payload: currentBorough,
  };
}
