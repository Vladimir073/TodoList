import React, { FC, memo, useCallback, useState } from 'react';
import { SInput, SItem } from '../assets/styles/app.styles';
import { IDataMoko } from '../types/IDataMoko';
import { Button } from './UI/Button';

interface IItem extends IDataMoko {
    remove: (id: string) => void;
    compl: (id: string) => void;
    saveTitle: (id: string, valueInput: string) => void;
}
export const Todo: FC<IItem> = memo(({ title, completed, id, remove, compl, saveTitle }) => {
    const [editable, setEditable] = useState(false);
    const [valueInput, setValueInput] = useState<string>(title);

    const handleCancelClick = useCallback(() => {
        setEditable(false);
        setValueInput(title);
    }, [title]);

    const handleSaveClick = useCallback(() => {
        saveTitle(id, valueInput);
        setEditable(false);
    }, [id, saveTitle, valueInput]);

    return (
        <SItem>
            {editable ? (
                <div className='editable__box'>
                    <SInput value={valueInput} onChange={(e: any) => setValueInput(e.target.value)} />
                    <div className='editable__btns'>
                        <Button onClick={handleSaveClick}>Save</Button>
                        <Button onClick={handleCancelClick}>Cancel</Button>
                    </div>
                </div>
            ) : (
                <>
                    <div className='input__title'>
                        <input type='checkbox' checked={completed} onChange={() => compl(id)} />
                        <h2>{title}</h2>
                    </div>
                    <div className='input__box'>
                        <Button onClick={() => setEditable(true)}>Edit</Button>
                        <Button onClick={() => remove(id)}>Delete</Button>
                    </div>
                </>
            )}
        </SItem>
    );
});
