import { createClient } from '../services/horizon';

export const HZ_CLIENT_CREATED = 'HZ_CLIENT_CREATED';

export const createdHorizonClient = (client) => {
  return { type: HZ_CLIENT_CREATED, payload: client };
};

export const getOrCreateHorizonClient = () => {
  return (dispatch, getState) => {
    const { horizon } = getState();

    if (horizon && Object.keys(horizon).length) {
      return horizon;
    } else {
      const client = createClient();
      dispatch(createdHorizonClient(client));
      return client;
    }
  };
};
