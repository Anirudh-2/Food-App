export const deleteEventAction = (eventId) => {
    return (dispatch, getState) => {
      // Assuming you call an API or perform some action to delete the event
      // For simplicity, let's assume the event is deleted here directly from the store
      dispatch({
        type: 'DELETE_EVENT',
        payload: eventId,
      });
    };
  };
  