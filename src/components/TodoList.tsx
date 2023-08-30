import { SInput, SList } from '../assets/styles/app.styles';
import { IDataMoko } from '../types/IDataMoko';
import { dataMoko } from '../data/Data';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Todo } from './Todo';
import { Button } from './UI/Button';
import { v4 as uuidv4 } from 'uuid';
import { LocalStorage } from '../utils/local-storage.utils';
import { StatusEnum } from '../models/status.model';

export const TodoList = () => {
    const [newListTodo, setNewListTodo] = useState<IDataMoko[]>([]);
    const [listTodo, setListTodo] = useState<IDataMoko[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');
    const [isActiveTab, setIsActiveTab] = useState(StatusEnum.All);

    // const filteredList = useMemo(() => {
    //     return newListTodo.filter(item => {
    //         if (isActiveTab === StatusEnum.All) {
    //             return true;
    //         }
    //         if (item.completed && isActiveTab === StatusEnum.Completed) {
    //             return true;
    //         }
    //         if (!item.completed && isActiveTab === StatusEnum.Active) {
    //             return true;
    //         }
    //         return false;
    //     });
    // }, [isActiveTab, newListTodo]);

    useEffect(() => {
        if (localStorage.length) {
            setNewListTodo(JSON.parse(localStorage.getItem('newListTodo') || ''));
        } else {
            setNewListTodo(dataMoko);
        }
    }, []);

    useEffect(() => {
        setListTodo(newListTodo);
    }, [newListTodo]);

    const addNewTodo = useCallback(() => {
        let value;
        if (newTodo !== '') {
            value = {
                id: uuidv4(),
                title: newTodo,
                completed: false,
            };
            let updatedList = [...newListTodo, value];
            setNewListTodo(updatedList);
            LocalStorage(updatedList);
            setNewTodo('');
            setIsActiveTab(StatusEnum.All);
        }
    }, [newListTodo, newTodo]);

    const changeSaveTitle = useCallback(
        (id: string, valueInput: string) => {
            const arr = newListTodo.map(item => {
                if (id === item.id) {
                    return { ...item, title: valueInput };
                } else {
                    return item;
                }
            });
            setNewListTodo(arr);
            LocalStorage(arr);
        },
        [newListTodo]
    );

    const removeTodo = useCallback(
        (id: string) => {
            const arr = newListTodo.filter(item => item.id !== id);
            setNewListTodo(arr);
            LocalStorage(arr);
        },
        [newListTodo]
    );

    const showAllTodo = useCallback(() => {
        setListTodo(newListTodo);
        setIsActiveTab(StatusEnum.All);
    }, [newListTodo]);

    const showActiveTodo = useCallback(() => {
        setListTodo(newListTodo.filter(item => !item.completed));
        setIsActiveTab(StatusEnum.Active);
    }, [newListTodo]);

    const showCompletedTodo = useCallback(() => {
        setListTodo(newListTodo.filter(item => item.completed));
        setIsActiveTab(StatusEnum.Completed);
    }, [newListTodo]);

    function changeCompleted(id: string) {
        const arr = newListTodo.map(item => {
            if (item.id === id) {
                return { ...item, completed: !item.completed };
            } else {
                return item;
            }
        });
        setNewListTodo(arr);
        localStorage.clear();
        localStorage.setItem('newListTodo', JSON.stringify(arr));
    }

    return (
        <SList>
            <div className='add__todo'>
                <SInput
                    type='text'
                    value={newTodo}
                    onChange={(e: any) => setNewTodo(e.target.value)}
                    placeholder='New todo...'
                />
                <Button onClick={addNewTodo}>Add</Button>
            </div>
            {/* <AddTodo addTodo={addNewTodo}/> */}
            <div className='show__todo'>
                <Button
                    onClick={showAllTodo}
                    style={
                        isActiveTab === StatusEnum.All
                            ? { background: 'rgb(189, 147, 249)' }
                            : { background: 'transparent' }
                    }
                >
                    Show All Tasks
                </Button>
                <Button
                    onClick={showActiveTodo}
                    style={
                        isActiveTab === StatusEnum.Active
                            ? { background: 'rgb(189, 147, 249)' }
                            : { background: 'transparent' }
                    }
                >
                    Show Active Tasks
                </Button>
                <Button
                    onClick={showCompletedTodo}
                    style={
                        isActiveTab === StatusEnum.Completed
                            ? { background: 'rgb(189, 147, 249)' }
                            : { background: 'transparent' }
                    }
                >
                    Show completed Tasks
                </Button>
            </div>

            <h2>
                {listTodo.length} task{listTodo.length === 1 ? '' : 's'} remaining
            </h2>
            {listTodo.map(item => {
                return (
                    <Todo
                        key={item.id}
                        id={item.id}
                        completed={item.completed}
                        title={item.title}
                        remove={removeTodo}
                        compl={changeCompleted}
                        saveTitle={changeSaveTitle}
                    />
                );
            })}
        </SList>
    );
};
