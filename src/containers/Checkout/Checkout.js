import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../containers/Checkout/ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients : null,
        totalPrice: 0
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients= {};
        let price = 0;

        for(let param of query.entries()) {
            if(param[0] === 'price')
                price = +param[1];
            else
                ingredients[param[0]] = +param[1]; // The + sign is just to explicit conversion from string to number
        }

        this.setState({ingredients: ingredients, totalPrice: price});
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutContinued={this.checkoutContinuedHandler}
                    checkoutCancelled={this.checkoutCancelledHandler} />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => {
                        return (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />);
                    }} />
            </div>
        );
    }
}

export default Checkout;