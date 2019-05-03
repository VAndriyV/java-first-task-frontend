

const updateUserBooks =(state,action)=>{

    if(state===undefined){
        return{
            userEmail:null,
            phoneNumber:null,
            books:[],
            error:null,
            loading:false
        };
    }

    switch(action.type){
        case 'FETCH_USERBOOKS_REQUEST':
        return{
            userEmail:null,
            phoneNumber:null,
            books:[],
            error:null,
            loading:true
        };

        case 'FETCH_USERBOOKS_SUCCESS':
        return{
            userEmail:action.payload.user.email,
            phoneNumber:action.payload.user.phoneNumber,
            books:action.payload.books,
            error:null,
            loading:false
        };

        case 'FETCH_USERBOOKS_FAILURE':
        return{
            userEmail:state.userBooks.userEmail,
            phoneNumber:state.userBooks.phoneNumber,
            books:state.userBooks.books,
            error:null,
            loading:false
        };

        default:
            return state.userBooks;
    }
};

export default updateUserBooks;