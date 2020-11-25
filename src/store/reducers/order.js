import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    loadingOrders: true
};

const purchaseInit = (state, action) => {
    return updateObject(state, {purchased: false});
}

const purcahseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderId});
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
}

const purcahseBurgerFail = (state, action) => {
    return updateObject(state, { loading: false });
}

const purcahseBurgerStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const fetchOrdersStart = (state, action) => {
    return updateObject(state, { loadingOrders: true });
}

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, { orders: action.orders, loadingOrders: false });
}

const fetchOrdersFail = (state, action) => {
    return updateObject(state, { loadingOrders: false });
}

const reducer = (state = initialState, action) => {
    switch( action.type ) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCAHSE_BURGER_SUCCESS: return purcahseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purcahseBurgerFail(state, action);
        case actionTypes.PURCHASE_BURGER_START: return purcahseBurgerStart(state, action);
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);
        default: return state;
    }
}

export default reducer;