import React, {Component} from 'react';

import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import Button from '../../UI/Button/Button';


// This could be a functional component, doesn't have to be a class based component
class OrderSummary extends Component {

	// componentDidUpdate() {
	// 	console.log('[OrderSummary] Updated');
	// }

	render() {
		const ingredientSummary = Object.keys(this.props.ingredients)
								.map((igKey) => {
									return (
										<li key={igKey}>
											<span style={{textTransform: 'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}
										</li>
									);
								});
		return (
			<Auxilliary>
				<h3>Your Order</h3>
				<p>A delicious burger with the following ingredients:</p>
				<ul>
					{ingredientSummary}
				</ul>
				<p><strong>Total Price: {this.props.price}</strong></p>
				<p>Continue to Checkout?</p>
				<Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
				<Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
			</Auxilliary>
		);
	}   
}

export default OrderSummary;