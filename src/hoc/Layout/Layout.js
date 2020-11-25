import React, {Component} from 'react';
import { connect } from 'react-redux';

import Auxilliary from '../Auxilliary/Auxilliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from  '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer : false
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState)=> {
            return {showSideDrawer : !prevState.showSideDrawer};
        });
    }

    render() {
        return (
            <Auxilliary>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxilliary>
        );
    }

}

const mapStateToPros = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToPros)(Layout);