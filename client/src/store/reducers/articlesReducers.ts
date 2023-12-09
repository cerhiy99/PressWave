
export enum ArticlesTypes {
    ARTICLES_GET_ID = "ARTICLES_GET_ID",
    ARTICLES_ADD = "ARTICLES_ADD",
    ARTICLES_UPD = "ARTICLES_UPD",
    ARTICLES_GET_LATEST="ARTICLES_GET_LATEST",
    ARTICLE_GET_HOT="ARTICLE_GET_HOT",
    ARTICLE_GET_MOST_POPULAR="ARTICLE_GET_MOST_POPULAR",
    ARTICLE_GET_ARTICLE_FOR_CATEGORIES="ARTICLE_GET_ARTICLE_FOR_CATEGORIES",
    ARTICLE_GET_MINI_VIDEO="ARTICLE_GET_MINI_VIDEO",
    ARTICLE_GET_FOR_YOU="ARTICLE_GET_FOR_YOU",
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
    idCategories:{categoryId:number}[];
    idHashtag:{hestegId:number}[];
}

export interface articleState{
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
    idCategories:{categoryId:number}[];
    idHashtag:{hestegId:number}[];
    neigborArticle:ArticlesGetState[];
}


export interface CategoryArticles{
    categoryId:number,
    page:number,
    articles:ArticlesGetState[]|[],
    count:number
}

export interface ArticlesState {
    typeSort:string;
    articles:ArticlesGetState[];
    articlesLatest:ArticlesGetState[];
    article:articleState|null;
    articlesHot:ArticlesGetState[];
    articlesMostPopular:ArticlesGetState[];
    listCategoryArticles:CategoryArticles[];
    miniVideo:ArticlesGetState[];
    forYou:ArticlesGetState[];

}


const initialState: ArticlesState = {
    typeSort:"",
    articles:[],
    articlesLatest:[],
    article:null,
    articlesHot:[],
    articlesMostPopular:[],
    listCategoryArticles:[],
    miniVideo:[],
    forYou:[]
    
};
  
export const ArticlesReducer = (state = initialState, action: { type: ArticlesTypes; payload: any }): ArticlesState => {
    switch (action.type) {
        case ArticlesTypes.ARTICLE_GET_FOR_YOU:{
            return {...state,forYou:action.payload};
        }
        case ArticlesTypes.ARTICLE_GET_MOST_POPULAR:{
            return {...state,articlesMostPopular:action.payload};
        }
        case ArticlesTypes.ARTICLES_GET_LATEST:{
            return {...state,articlesLatest:action.payload};
        }
        case ArticlesTypes.ARTICLES_GET_ID:{
            return {...state,article:action.payload}
        }
        case ArticlesTypes.ARTICLE_GET_HOT:{
            return {...state,articlesHot:action.payload}
        }
        case ArticlesTypes.ARTICLE_GET_ARTICLE_FOR_CATEGORIES: {
            const { categoryId, page, articles, count } = action.payload;
            const index = state.listCategoryArticles.findIndex((item) => item.categoryId === categoryId);
          
            if (index !== -1) {
              const updatedCategoryArticle = {
                categoryId,
                page,
                articles,
                count
              };
              let updatedList = [...state.listCategoryArticles];
              updatedList[index] = {
                ...updatedList[index],
                ...updatedCategoryArticle,
              };
              return { ...state, listCategoryArticles: updatedList };
            } else {
              const newCategoryArticle:CategoryArticles = {
                categoryId,
                page,
                articles,
                count
              };
              const newList = [...state.listCategoryArticles, newCategoryArticle];
              return { ...state, listCategoryArticles: newList };
            }
        }
        case ArticlesTypes.ARTICLE_GET_MINI_VIDEO:{
            return {...state,miniVideo:action.payload};
        }
          
        default:
            return state;
    }
};