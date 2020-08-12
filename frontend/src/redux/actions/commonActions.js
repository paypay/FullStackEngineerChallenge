import { START_LOADING, END_LOADING } from '../actionConstants';

export const authStartLoading = () => ({ type: START_LOADING });
export const authEndLoading = () => ({ type: END_LOADING });
