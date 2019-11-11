import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { getToken } from '../utils/api';


const ProtectedRoute = ({ component: Component, ...rest}) => {

	return (
		<Route {...rest} render={(renderProps) => {
			if (getToken()) {
				return <Component {...renderProps} />
			} else {
				return <Redirect to='/' />
			}
		}} />
	);
};


export default ProtectedRoute;
