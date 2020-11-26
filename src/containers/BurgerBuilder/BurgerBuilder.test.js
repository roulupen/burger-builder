import React from 'react';
import { configure, shallow }  from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
    });

    it('should render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({
            ings: {
                salad: 0,
                cheese: 0,
                meat: 0,
                bacon: 0
            },
            price: 4
        });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
});