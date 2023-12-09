
export enum HastagTypes {
    HASTAG_GET = "HASTAG_GET"
}

export interface HastagState {
    hastags: {id:number,name:string}[];
}
  
const initialState: HastagState = {
    hastags: [],
    
};
  
export const HastagReducer = (state = initialState, action: { type: HastagTypes; payload: any }): HastagState => {
    switch (action.type) {
        case HastagTypes.HASTAG_GET:{
            return {...state, hastags:action.payload}
        }
        default:
            return state;
    }
};