import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

class Orders extends Component {

    componentDidMount() {
        this.props.onGetOrders();
    }

    render() {
        return (
            <div>
                {this.props.loading ? <Spinner/> :
                    this.props.orders.map(order => {
                        return <Order key={order.id}
                                    ingredients={order.ingredients}
                                    price={order.price} />
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loadingOrders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetOrders: () => dispatch(actions.fetchOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));