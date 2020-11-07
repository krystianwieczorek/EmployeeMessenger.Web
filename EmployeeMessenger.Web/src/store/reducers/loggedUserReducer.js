const InitialState = {
  data: { firstName: "", lastName: "", email: "" },
};

export const loggedUserReducer = (state = InitialState, action) => {
  switch (action.type) {
    case "LOGGED_USER":
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};
