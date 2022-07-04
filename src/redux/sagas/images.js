import { takeLatest, put,  call } from "redux-saga/effects";
import Axios from "axios";
import { FETCH_IMAGES } from "../constants/ActionTypes";

// fetch images
function* fetchImages({ payload }) {

    const { type, pageNo } = payload; 
    let url = `http://localhost:3001/images`;

    if (type && type !== "") {
        url = `${url}?&type=${type}`;
    }
    else {
        url = `${url}?&_limit=8&_page=${pageNo}`;
    }

    yield put({
        type: FETCH_IMAGES.IMAGES_LOADING,
        payload: true
    });


	try {
        const count = yield call(Axios.get, "http://localhost:3001/totalCount");
        const result = yield call(Axios.get, url);
        yield put({
			type: FETCH_IMAGES.TOTAL_COUNT,
			payload: parseInt(count.data.count) 
		});
		yield put({
			type: FETCH_IMAGES.IMAGES_DATA,
			payload: result.data || []
		});
        yield put({
            type: FETCH_IMAGES.IMAGES_LOADING,
            payload: false
        });
	}
	catch {
        yield put({
            type: FETCH_IMAGES.IMAGES_LOADING,
            payload: false
        });
	}
}

export function* fetchImagesActionWatcher() {
  yield takeLatest(FETCH_IMAGES.IMAGES_CALLED, fetchImages);
}


