declare module 'react-popper' {
    import { PopperProps } from 'popper.js';
    import * as React from 'react';

    export const Popper: React.FC<PopperProps>;
    export const Reference: React.FC<React.HTMLProps<HTMLElement>>;

}
