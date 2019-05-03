const adminOperations = (state, action) => {
    if (state === undefined) {
        return {
            error: null,
            operationType: ''
        }
    }

    switch (action.type) {

        case 'ADD_ITEM_ERROR':
            console.log(state);
            return {
                error: action.payload,
                operationType: 'CREATE'
            }
        case 'UPDATE_ITEM_ERROR':
            return {
                error: action.payload,
                operationType: 'UPDATE'
            }
        case 'OPERATION_SUCCESS':
            return {
                error: null,
                operationType: ''
            }
        default:
            return state.adminOperations;
    }

};

export default adminOperations;