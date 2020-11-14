const InitialState = {
  data: { firstName: "", lastName: "", email: "", isLogged: false },
};

export const authReducer = (state = InitialState, action) => {
  switch (action.type) {
    case "SIGNIN":
      return {
        ...state,
        data: action.data,
        isLogged: true,
      };
    default:
      return state;
  }
};
