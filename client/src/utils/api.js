import axios from 'axios';


export const baseURL = 'http://localhost:5000';


export const getToken = () => {
	return localStorage.getItem('BA-token');
};

export const clearToken = () => {
	return localStorage.removeItem('BA-token');
};

export const setToken = (token) => {
	return localStorage.setItem('BA-token', token);
};


export const apiWithAuth = () => {
	return axios.create({
		baseURL: baseURL,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': getToken()
		}
	});
};


export const login = (credentials, errorSetter, bubbleState, setState) => {

	axios.post(`${baseURL}/api/login`, credentials)
		.then(res => {
			setToken(res.data.payload);
			errorSetter('');
			setState( {...bubbleState, token: res.data.payload });
		})
		.catch(err => {
			if (err.response.status === 403) {
				errorSetter('Invalid username/password pair');
			} else {
				errorSetter('An error occurred. Please try again.');
			}
		});
};

