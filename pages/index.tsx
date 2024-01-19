import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store/configureStore';
import CarForm from '../src/components/CarForm/Carform';
import { ChakraProvider, extendTheme, CSSReset, Progress } from '@chakra-ui/react';
import * as S from '../styles/stylesHome';

const theme = extendTheme({
  fonts: {
    body: 'Roboto, sans-serif',
    heading: 'Roboto, sans-serif',
    mono: 'Roboto, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'ghostwhite',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
        h: '100vh',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
});

const HomePage: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Provider store={store}>
        <S.Container>
            <S.Title as={'h1'}>Tabela Fipe</S.Title>
            <S.SubTitle as={'span'}>Consulte o valor de um veículo de forma gratuita</S.SubTitle>
            <CarForm />
        </S.Container>
        
      </Provider>
    </ChakraProvider>
  );
};

export default HomePage;
