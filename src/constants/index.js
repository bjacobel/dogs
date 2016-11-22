export const SHOW_DEV_TOOLS = process.env.NODE_ENV !== 'production';
export const TRACK_ANALYTICS = process.env.NODE_ENV !== 'production';
export const HORIZON_AUTH = {
  host: 'rethinkdb.bjacobel.com:28016',
  secure: true,
};
export const GA_ID = 'UA-34138258-6';
export const ELO_K = 32;
export const ELO_INITIAL = 1000;
