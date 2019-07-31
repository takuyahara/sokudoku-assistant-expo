import { createContext } from 'react';

const SaveContext = createContext(
    (page: number) => {}
);
export default SaveContext;