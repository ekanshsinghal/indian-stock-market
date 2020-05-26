import { SET_STATE_MOBILE, SET_QUICK_VIEW, SHOW_ALERT, FETCH_COMMON_DETAILS } from './action_constants';

export function setStateMobile() {
	return { type: SET_STATE_MOBILE};
}

export function setQuickView(item) {
	return { type: SET_QUICK_VIEW, payload: item};
}

export function showAlert(alert) {
	return { type: SHOW_ALERT, payload: alert}
}

export function requestCommonDetails() {
	return { type: FETCH_COMMON_DETAILS.INITIATE };
}

export function commonDetailsPending() {
	return { type: FETCH_COMMON_DETAILS.PENDING };
}

export function commonDetailsSuccess(details) {
	return { type: FETCH_COMMON_DETAILS.SUCCESS, payload: details };
}

export function commonDetailsFail(error) {
	return { type: FETCH_COMMON_DETAILS.REJECTED, payload: error };
}