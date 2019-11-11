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


// log in to the server. not authorized yet so don't use apiWithAuth
export const login = (credentials, errorSetter) => {

	axios.post(`${baseURL}/api/login`, credentials)
		.then(res => {
			setToken(res.data.payload);
			errorSetter('');
		})
		.catch(err => {
			if (err.response.status === 403) {
				errorSetter('Invalid username/password pair');
			} else {
				errorSetter('An error occurred. Please try again.');
			}
		});
};


// get colors from server
export const getColors = (setter) => {
	apiWithAuth()
    	.get('/api/colors')
    	.then(res => {
        	setter(res.data);
    	})
    	.catch(err => {
    		console.log(err.response.data.error);
    	});
};


// update a color on the server
export const updateColor = (color, setter) => {
	apiWithAuth()
    	.put(`/api/colors/${color.id}`, color)
    	.then(res => {
    		// on success, the server returns only the updated color
    		// we need to update the whole list
        	getColors(setter);
    	})
    	.catch(err => {
    		// todo: add some error handling here!
    		console.log(err);
    	});
};


// delete a color from the server
export const removeColor = (color, setter) => {
	apiWithAuth()
    	.delete(`/api/colors/${color.id}`)
    	.then(res => {
    		// on success, the server returns only the deleted color id
    		// we need to update the whole list
        	getColors(setter);
    	})
    	.catch(err => {
    		// todo: add some error handling here!
    		console.log(err);
    	});
};

