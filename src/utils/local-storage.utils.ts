import { IDataMoko } from '../types/IDataMoko';

export const LocalStorage = (val: IDataMoko[]) => {
    localStorage.clear();
    localStorage.setItem('newListTodo', JSON.stringify(val));
};
