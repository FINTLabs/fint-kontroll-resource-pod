import React from 'react';
import './App.css';
import MainContainer from "./features/main/MainContainer";
import theme from './template/theme';
import {ThemeProvider} from '@mui/material/styles';
import ResourceProvider from "./context";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <ResourceProvider>
                <MainContainer/>
            </ResourceProvider>
        </ThemeProvider>
    );
}

export default App;
