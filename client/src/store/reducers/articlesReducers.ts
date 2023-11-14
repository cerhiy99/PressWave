
export enum ArticlesTypes {
    ARTICLES_GET = "ARTICLES_GET",
    ARTICLES_ADD = "ARTICLES_ADD",
    ARTICLES_UPD = "ARTICLES_UPD",
}
export interface ArticlesGetState{
    id:number;
    name:string;
    date:Date;
    image:string;
    description:string;
    countWatch:number;
    isImage:boolean;
    video:string;
    time:string;
    timeReading:string;
    isHot:boolean;
    isHotMain:boolean;
}
/*
export interface ArticlesAddState{
    id:number;
    name1:string;
    name2:string;
    name3:string;
    date:Date;
    image:string;
    description1:string;
    description2:string;
    description3:string;
    countWatch:number;
    isImage:boolean;
    video:string;
    time:string;
    timeReading:string;
    isHot:boolean;
    isHotMain:boolean;
}*/

export interface ArticlesState {
    typeSort:string;
    articles:ArticlesGetState[];
}
  
const initialState: ArticlesState = {
    typeSort:"",
    articles:[]
};
  
export const ArticlesReducer = (state = initialState, action: { type: ArticlesTypes; payload: any }): ArticlesState => {
    switch (action.type) {

        default:
            return state;
    }
};