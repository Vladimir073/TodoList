import { IDataMoko } from '../types/IDataMoko';

export const LocalStorage = (val: IDataMoko[]) => {
    localStorage.removeItem('newListTodo');
    localStorage.setItem('newListTodo', JSON.stringify(val));
};
