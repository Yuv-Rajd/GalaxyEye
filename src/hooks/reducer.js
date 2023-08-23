export const initalStates = {
  startLatLng: null,
  endLatLng: null,
  startPoint: [],
  endPoint: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "startpoint":
      return {
        ...state,
        startLatLng: action.payload,
        endLatLng: action.payload,
        startPoint: action.payload,
        endPoint: [],
      };
    case "endpoint":
      return {
        ...state,
        endLatLng: action.payload,
        endPoint: action.payload,
      };
    default: {
      return state;
    }
  }
};
