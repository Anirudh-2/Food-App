const initialState = {
    restaurantsEvents: [],
    // other state
  };
  
  const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'DELETE_EVENT':
        return {
          ...state,
          restaurantsEvents: state.restaurantsEvents.filter(
            (event) => event.id !== action.payload
          ),
        };
      // other cases
      default:
        return state;
    }
  };
  
  export default restaurantReducer;
  