import { FETCH_PORTFOLIO } from './action_constants';

export function requestPortfolio() {
    return { type: FETCH_PORTFOLIO.INITIATE };
}

export function portfolioPending() {
    return { type: FETCH_PORTFOLIO.PENDING };
}

export function portfolioSuccess(portfolio) {
    return { type: FETCH_PORTFOLIO.SUCCESS, payload: portfolio };
}

export function portfolioFail(error) {
    return { type: FETCH_PORTFOLIO.REJECTED, payload: error };
}

export function addPortfolio(params) {
    return { type: FETCH_PORTFOLIO.ADD, payload: params };
}