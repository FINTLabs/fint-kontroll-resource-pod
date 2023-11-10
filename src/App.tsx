import React from 'react';
import './App.css';
import theme from './template/theme';
import {ThemeProvider} from '@mui/material/styles';
import RouteList from "./routes/RouteList";
import {BasePathProvider, useBasePath} from "./context/BasePathContext";
import ResourceProvider from "./context/ResourceContext";

function App() {
    const basePath = useBasePath() || '';
    return (
        <ThemeProvider theme={theme}>
            <BasePathProvider>
                    <ResourceProvider basePath={basePath}>
                        <RouteList/>
                    </ResourceProvider>
            </BasePathProvider>
        </ThemeProvider>
    );
}

export default App;
