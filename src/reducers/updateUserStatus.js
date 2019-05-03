
const updateUserStatus = (state, action) => {
    if (state === undefined) {
        return {
            isLoggedIn: false,
            message: null,
            roleId: -1
        };
    }
    switch (action.type) {
        case "LOGIN_SUCCESS":        
            return {
                isLoggedIn: true,
                message: null,
                roleId:action.payload.roleId
            };
        case "LOGIN_FAILURE":
            return {
                isLoggedIn: false,
                message: action.payload,
                roleId: -1
            };
        case 'REGISTRATION_SUCCESS':
            return {
                isLoggedIn: state.userStatus.isLoggedIn,
                message: action.payload,
                roleId: state.userStatus.roleId
            };
        case 'REGISTRATION_FAILURE':
            return {
                isLoggedIn: state.userStatus.isLoggedIn,
                message: action.payload,
                roleId: state.userStatus.roleId
            };
        case 'LOGOUT':
            localStorage.removeItem("token");
            return {
                isLoggedIn: false,
                message: null,
                roleId: -1
            };
        case 'USER_IS_LOGGED_IN':
            return {
                isLoggedIn: true,
                message: null,
                roleId: action.payload.roleId
            };
        case 'USER_IS_GUEST':
            return {
                isLoggedIn: false,
                message: null,
                roleId: -1
            };
        case 'RESET_MESSAGE':
            return {
                isLoggedIn: state.userStatus.isLoggedIn,
                message: null,
                roleId: state.userStatus.roleId
            };
        default:
            return state.userStatus;
    }
};
export default updateUserStatus;