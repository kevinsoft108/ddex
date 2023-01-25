import React, { useContext, useEffect, useReducer } from 'react';
import { mutate } from 'swr';

export const AuthStateContext = React.createContext({});

const initialState = {};

const reducer = (state, action) => {
	switch (action.type) {
		case ActionType.SetDetails:
			return {
				...state,
				...action.payload,
			};
		case ActionType.RemoveDetails:
			return {};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};

export const AuthProvider = ({ children }) => {
	let localState = null;
	if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
		localState = JSON.parse(localStorage.getItem('user') || '');
	}
	const [state, dispatch] = useReducer(reducer, localState || initialState);

	if (typeof localStorage !== 'undefined') {
		useEffect(() => {
			localStorage.setItem('user', JSON.stringify(state));
			mutate('user', JSON.stringify(state));
		}, [state]);
	}
	return (
		<AuthStateContext.Provider value={[state, dispatch]}>
			{children}
		</AuthStateContext.Provider>
	);
};

// useContext hook - export here to keep code for global auth state
// together in this file, allowing user info to be accessed and updated
// in any functional component using the hook
export const useAuth = () => useContext(AuthStateContext);
