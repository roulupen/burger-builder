import React from 'react';

import burgetLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const Logo = (props) => {
    return (
        <div className={classes.Logo} style={{height: props.height}}>
            <img src={burgetLogo} alt="MyBurger" />
        </div>
    );
};

export default Logo;