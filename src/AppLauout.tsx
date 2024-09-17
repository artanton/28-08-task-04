import { GlobalStyle } from './globalStyles/GlobalStyle';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { FC } from 'react';

import { MagnifyingGlass } from 'react-loader-spinner';
import { Container, Loader } from './AppLayoutStyled';
import { AppBar } from './components/AppBar/AppBar';
import { HelmetProvider } from 'react-helmet-async';


export const AppLayout: FC = () => {
  return (
    <HelmetProvider>
    <Container>
      <AppBar/>
      <main>
        <Suspense
          fallback={
            <Loader>
              <MagnifyingGlass
                visible={true}
                height="120"
                width="120"
                ariaLabel="magnifying-glass-loading"
                wrapperStyle={{}}
                wrapperClass="magnifying-glass-wrapper"
                glassColor="#3d9bba"
                color="#0f0d0d"
              />
            </Loader>
          }
        >
          <Outlet />
        </Suspense>
      </main>

      <GlobalStyle />
    </Container>
    </HelmetProvider>
  );
};
