import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorhandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            purchasing: false,
            loading: false,
            error : false
        };
    }

    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error: true});
        //     });
    }

    updatePurchaseState= (ingredients) => {
        const sum = Object.keys(ingredients)
					.map((igKey) => {
						return ingredients[igKey];
					})
                    .reduce((sum, el) => sum + el  , 0);
        return sum > 0;
    }

	purchaseHandler = () => {
		this.setState({purchasing: true});
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
	}

    render() {
        const disableInfo = {
            ...this.props.ings
        };
        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;
        if(this.state.loading)
            orderSummary = <Spinner />;

        let burger = this.state.error ? <p>Ingredients can't be loaded.</p> : <Spinner />
        if( this.props.ings ) {
            burger = (
                <Auxilliary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                                ingredientAdded={this.props.onIngredientAdded}
                                ingredientRemoved={this.props.onIngredientRemoved}
                                disabled={disableInfo}
                                purchasable={this.updatePurchaseState(this.props.ings)}
                                ordered={this.purchaseHandler}
                                price={this.props.price} />
                </Auxilliary>
            );

            orderSummary = <OrderSummary ingredients={this.props.ings}
                                price={this.props.price.toFixed(2)}
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler} />;
        }

        return (
            <Auxilliary>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
				</Modal>
                {burger}
            </Auxilliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENTS, ingredientName: ingName})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorhandler(BurgerBuilder, axios));