import { combineReducers, Reducer, AnyAction } from 'redux';
import { CategoriesReducer, CategoriesState } from './categoriesReducers';
import { ArticlesReducer, ArticlesState } from './articlesReducers';

export type RootState = {
  categories: CategoriesState;
  articles:ArticlesState
};

export type RootReducer = Reducer<RootState, AnyAction>;

export const rootReducers: RootReducer = combineReducers<RootState>({
  categories: CategoriesReducer,
  articles:ArticlesReducer
});
