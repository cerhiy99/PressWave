
export enum CategoriesTypes {
    CATEGORIES_GET = "CATEGORIES_GET",
    CATEGORIES_ADD = "CATEGORIES_ADD",
    CATEGORIES_UPD = "CATEGORIES_UPD",
}

export interface CategoriesState {
    categories: [{id:number,name:string,namePath:string}]|[];
    isAddsuccessful:boolean
}
  
const initialState: CategoriesState = {
    categories: [],
    isAddsuccessful:false
    
};
  
export const CategoriesReducer = (state = initialState, action: { type: CategoriesTypes; payload: any }): CategoriesState => {
    switch (action.type) {
        case CategoriesTypes.CATEGORIES_GET:{
            return { ...state, categories: action.payload };
        }
        case CategoriesTypes.CATEGORIES_ADD:{
            return {...state, isAddsuccessful:action.payload}
        }
        default:
            return state;
    }
};