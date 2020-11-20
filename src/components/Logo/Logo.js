import React from 'react';
import {Link} from 'react-router-dom';

import burgetLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const Logo = (props) => {
    return (
        <div className={classes.Logo} style={{height: props.height}}>
            <Link to="/"><img src={burgetLogo} alt="MyBurger" /></Link>
        </div>
    );
};

export default Logo;