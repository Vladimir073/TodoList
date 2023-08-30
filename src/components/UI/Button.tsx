import { FC, memo } from 'react';
import { SButton } from '../../assets/styles/app.styles';

interface IButton {
    children: string;
    onClick: () => void;
    style?: {
        background: string;
    };
}

export const Button: FC<IButton> = memo(({ children, onClick, ...props }) => {
    return (
        <SButton onClick={onClick} {...props}>
            {children}
        </SButton>
    );
});
