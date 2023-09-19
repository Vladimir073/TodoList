import React from 'react';
import { SApp, SHeader, STitle } from './assets/styles/app.styles';
import { TodoList } from './components/TodoList';

function App() {
    return (
        <SApp>
            <SHeader>
                <STitle>Todo List</STitle>
                <TodoList />
            </SHeader>
        </SApp>
    );
}

export default App;
