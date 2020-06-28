const initialState = {};

function updateStore(state = initialState, action) {
  switch (action.type) {
    case 'SIGNUP':
      var updatedSignupState = Object.assign({}, state, {
        ...state,
        data: action.payload,
      });
      return updatedSignupState;
    case 'LOGIN':
      var updatedLoginState = Object.assign(
        {},
        {
          loginData: action.payload,
        },
      );
      return updatedLoginState;
    default:
      return state;
  }
}
export default updateStore;
