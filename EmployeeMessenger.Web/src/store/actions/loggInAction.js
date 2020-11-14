export const loggInAction = (data) => async (dispatch) => {
  await dispatch({ type: "SIGNIN", data });
};
