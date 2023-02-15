const INITIAL_STATE = {
    allProduct          :[],
    allOnProgress       :[],
    allOnSuccess        :[],
    isLoadingProduct    :true
} 


// eslint-disable-next-line import/no-anonymous-default-export
export default  (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'GETALLPRODUCT' :
            return {...state,
                allProduct:action.allProduct,
                allOnProgress:action.allOnProgress,
                allOnSuccess:action.allOnSuccess,
                isLoadingProduct : false
            }
        case 'ADDPRODUCT':
            return {
                ...state,
                allProduct:action.allProduct
            }
        case 'UPDATEPRODUCT':
            return {
                ...state,
                allProduct:action.allProduct
            }
        case 'DELETEPRODUCT':
            return {
                ...state,
                allProduct:action.allProduct
            }
        case 'GETALLCATEGORY' :
            return {...state,allCategory:action.allCategory}
            
        default:
            return state
    }
}