const updateUserStatus = (state, action)=>{
    if(state===undefined){
        return{
            isLoggedIn:false,           
            message: null
        };
    }
    switch (action.type) {
        case "LOGIN_SUCCESS":
            localStorage.setItem("token",action.payload);
            return {
                isLoggedIn:true,                                
                message:null
            };
        case "LOGIN_FAILURE":
            return {
                isLoggedIn:false,               
                message:action.payload
            };
        case 'REGISTRATION_SUCCESS':
            return {
                isLoggedIn:state.userStatus.isLoggedIn,               
                message:action.payload
            };
        case 'REGISTRATION_FAILURE':
            return {
                isLoggedIn:state.userStatus.isLoggedIn,                
                message:action.payload
            };
        case 'LOGOUT':           
            localStorage.removeItem("token");
            return{
                isLoggedIn:false,                
                message:null
            };
        case 'USER_IS_LOGGED_IN':
            return{
                isLoggedIn:true,                
                message:null
            };
        case 'USER_IS_GUEST':
            return{
                isLoggedIn:false,                
                message:null
            };           
        default:
            return state.userStatus;
    }
};
export default updateUserStatus;