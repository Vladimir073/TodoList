import { memo } from 'react';

import styled from 'styled-components';

export const SApp = styled.div`
    text-align: center;
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
`;

export const SHeader = styled.main`
    width: 35rem;
`;
export const STitle = memo(styled.h1``);

export const SInput = memo(styled.input`
    background-color: white;
    flex: 1 1;
    padding: 8px 10px;
    border: 2px solid #bd93f9;
    border-radius: 10px;
    color: black;
    transition: 0.5s ease;

    &:focus {
        filter: drop-shadow(3px 3px 5px rgba(189, 147, 249, 0.7));
    }
`);

export const SList = memo(styled.ul`
    max-width: 800px;

    & .add__todo {
        display: flex;
        align-items: center;

        & input {
            margin-right: 15px;
        }
    }
    & .show__todo {
        margin: 20px 0;
        display: flex;
        justify-content: space-between;

        & button {
            margin: 0;
            width: 32%;
            padding: 8px 10px;
        }
    }
`);

export const SItem = memo(styled.li`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    min-height: 85px;

    & .editable__box {
        width: 215px;

        & input {
            width: 100%;
            margin-bottom: 10px;
        }

        & .editable__btns {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

    & .input__title {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        min-height: 35px;
    }

    & .input__box {
        display: flex;
        align-items: center;
    }

    & input[type='checkbox'] {
        width: 24px;
        height: 24px;
        margin-right: 20px;

        &:checked {
            background-color: black;
        }
    }

    & h2 {
        flex: 1 1;
        text-align: left;
    }
`);

export const SButton = memo(styled.button`
    border: 2px solid #bd93f9;
    border-radius: 10px;
    padding: 8px 20px;
    width: 100px;
    transition: all 0.2s ease;
    &:not(:last-child) {
        margin-right: 15px;
    }

    &:hover {
        background-color: #bd93f9;
    }

    &:active {
        transform: scale(0.95, 0.95);
    }
`);
