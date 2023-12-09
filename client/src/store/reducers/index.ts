import { combineReducers, Reducer, AnyAction } from 'redux';
import { CategoriesReducer, CategoriesState } from './categoriesReducers';
import { ArticlesReducer, ArticlesState } from './articlesReducers';
import { HastagReducer, HastagState } from './hastagRefducer';
import { AdditionalPagesReducer, AdditionalPagesState } from './additionalPagesReducers';

export type RootState = {
  categories: CategoriesState;
  articles:ArticlesState;
  hastag:HastagState;
  additionalPages:AdditionalPagesState
};

export type RootReducer = Reducer<RootState, AnyAction>;

export const rootReducers: RootReducer = combineReducers<RootState>({
  categories: CategoriesReducer,
  articles:ArticlesReducer,
  hastag:HastagReducer,
  additionalPages:AdditionalPagesReducer
});
