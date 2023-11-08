import { combineReducers, Reducer, AnyAction } from 'redux';
import { CategoriesReducer, CategoriesState } from './categoriesReducers';

export type RootState = {
  categories: CategoriesState;
};

export type RootReducer = Reducer<RootState, AnyAction>;

export const rootReducers: RootReducer = combineReducers<RootState>({
  categories: CategoriesReducer,
});
