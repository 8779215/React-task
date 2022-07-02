import { FETCH_IMAGES } from "../constants/ActionTypes";

const initialSettings = {
  listLoading: false,
  imagesList: [],
  totalCount: 0
};

const images = (state, action) => {
  if (typeof state === "undefined") {
    return initialSettings;
  }
  switch (action.type) {
    case FETCH_IMAGES.IMAGES_LOADING:
      return {
        ...state,
        listLoading: action.payload,
      };
    case FETCH_IMAGES.IMAGES_DATA:
      return {
        ...state,
        imagesList: action.payload,
      };
    case FETCH_IMAGES.TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.payload,
      };
    default:
      return state;
  }
};

export default images;
