const initialState = {
    user: null,
    isAuthenticated: false,
    token: null,
    error: null
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.payload.data.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true
            };
        case 'REGISTER_FAIL':
        case 'AUTH_ERROR':
        case 'LOGIN_FAIL':
        case 'LOGOUT':
        case 'USER_FAILURE':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case 'USER_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                error: null,
                user: action.payload.data
            }
        default:
            return state;
    }
};

export default loginReducer;