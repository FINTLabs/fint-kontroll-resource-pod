import React from 'react';
import './App.css';
import theme from './template/theme';
import {ThemeProvider} from '@mui/material/styles';
import ResourceProvider from "./context";
import RouteList from "./routes/RouteList";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <ResourceProvider>
                <RouteList/>
            </ResourceProvider>
        </ThemeProvider>
    );
}

export default App;
