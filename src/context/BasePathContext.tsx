import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

type BasePathContextType = string | undefined; // Define the type of the context value

const BasePathContext = createContext<BasePathContextType | undefined>(undefined);

export const useBasePath = (): BasePathContextType => {
    return useContext(BasePathContext);
};

interface BasePathProviderProps {
    children: ReactNode;
}

export const BasePathProvider: React.FC<BasePathProviderProps> = ({ children }) => {
    const [basePath, setBasePath] = useState<string>('/');

    useEffect(() => {
        const getBasePath = () => {
            axios.get('api/layout/configuration')
                .then(response => {
                    setBasePath(response.data.basePath);
                    console.log("basePath in context", response.data.basePath);
                })
                .catch((err) => {
                    console.error(err);
                });
        };

        if (process.env.NODE_ENV === 'production') {
            getBasePath();
        }
    }, []);

    return (
        <BasePathContext.Provider value={basePath}>
            {children}
        </BasePathContext.Provider>
    );
};
