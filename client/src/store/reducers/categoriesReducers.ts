
export enum CategoriesTypes {
    CATEGORIES_GET = "CATEGORIES_GET",
    CATEGORIES_ADD = "CATEGORIES_ADD",
    CATEGORIES_UPD = "CATEGORIES_UPD",
}

export interface CategoriesState {
    categories: [id:number,name:string]|[];
}
  
const initialState: CategoriesState = {
    categories: [],
};
  
export const CategoriesReducer = (state = initialState, action: { type: CategoriesTypes; payload: any }): CategoriesState => {
    switch (action.type) {
        case CategoriesTypes.CATEGORIES_GET:{
            return { ...state, categories: action.payload };
        }
        default:
            return state;
    }
};