  
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import amber from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: amber,
  },  
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
, document.getElementById('root'));