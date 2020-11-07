export const loggedUserAction = (data) => async (dispatch) => {
  await dispatch({ type: "LOGGED_USER", data });
};
