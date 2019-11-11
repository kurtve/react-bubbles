import React, { useState } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import { login, getToken } from '../utils/api';


const LoginWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 10px;
	width: 100%;

	text-align: center;

	h1 {
    	font-size: 40px;
    	margin: 20px;
	} 

	h3 {
		font-size: 30px;
		margin: 20px;
	}

	.error {
		font-size: 16px;
		color: red;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 350px;
		margin-top: 10px;
		padding: 10px;
		border: 2px solid grey;
		border-radius: 10px;
	}

	label {
		font-size: 14px;
		font-style: italic;
	}

	span {
		display: inline-block;
		text-align: right;
		width: 80px;
		margin-right: 5px;
		padding-top: 15px;
	}

	input {
		font-size: 14px;
		margin: 5px;
		padding: 5px;
		width: 150px;
	}


	button {
		height: 28px;
		background-color: #AAA;
		color: black;
		border: none;
		border-radius: 5px;
		width: 60px;
		font-size: 14px;
		margin-top: 10px;

		&:hover {
			cursor: pointer;
			background-color: grey;
			color: white;
		}
	}
`;



const Login = (props) => {

	const [error, setError] = useState();

	const [data, setData] = useState({
		username: '',
		password: ''
	});


	const handleChange = (e) => {
		setData({
			...data, [e.target.name]: e.target.value
		});
	};


	const handleSubmit = (e) => {
		e.preventDefault();

		if (!(data.username && data.password)) {
			setError('You must supply a username and password!');
		} else {
			login(data, setError);
		}
	};


	// if we successfully logged in, go to bubble display
	if (getToken()) {
		console.log('redirecting to "/bubbles"');

		return  (<Redirect to='/bubbles' />);
	}

	return (
		<LoginWrapper>
	        <h1>Welcome to the Bubble App!</h1>
			<h3>Login Page</h3>

			{error && <div className='error'>{error}</div>}

			<form onSubmit={handleSubmit}>

				<label name='username'><span>Userame:</span>
					<input type='text' name='username' placeholder='Username'
						value={data.username} onChange={handleChange} />
				</label>
				<label name='password'><span>Password:</span>
					<input type='password' name='password' placeholder='Password'
						value={data.password} onChange={handleChange} />
				</label>

				<button type='submit'>Log In</button>
			</form>
		</LoginWrapper>
	);

};

export default Login;
