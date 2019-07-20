import { createContext } from 'react';

const MyContext = createContext(
    (func: () => void, criteria: (index: number) => boolean) => {}
);
export default MyContext;