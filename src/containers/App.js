import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NoSsr from '@material-ui/core/NoSsr';
import { createMuiTheme } from '@material-ui/core/styles';
import { palette, spacing, typography } from '@material-ui/system';

import './App.css';
import { Provider  } from '../models';
import { createRootStore } from '../models';
import { apiClient } from '../services/apiClient';
import ProductsSection from '../components/ProductsSection';

const theme = createMuiTheme();

const Box = styled.div`${palette}${spacing}${typography}`;

const rootStore = createRootStore(apiClient);

function App() {
  return (
    <NoSsr>
      <ThemeProvider theme={theme}>
        <Provider value={rootStore}>
          <div className="App">
            <header className="App-header">
              <Box>
                Mobx-State-Tree Demo
              </Box>
            </header>
              <div className="App-main">
                <Box>
                  Products
                  <ProductsSection />
                </Box>
              </div>
              <div className="App-content">Cart</div>
          </div>
        </Provider>
      </ThemeProvider>
    </NoSsr>
  );
}

export default App;
