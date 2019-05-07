

const updateUserBooks =(state,action)=>{

    if(state===undefined){
        return{          
            userId:null,
            phoneNumber:null,
            books:[],
            error:null,
            loading:false
        };
    }

    switch(action.type){
        case 'FETCH_USERBOOKS_REQUEST':
        return{           
            userId:null,
            phoneNumber:null,
            books:[],
            error:null,
            loading:true
        };

        case 'FETCH_USERBOOKS_SUCCESS':       
        return{           
            userId:action.payload.user.id,
            phoneNumber:action.payload.user.phoneNumber,
            books:action.payload.books,
            error:null,
            loading:false
        };

        case 'FETCH_USERBOOKS_FAILURE':
        return{           
            userId:state.userBooks.userId,
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