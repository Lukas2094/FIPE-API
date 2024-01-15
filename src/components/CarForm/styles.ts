import { Button, Flex, Select } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const Container = styled(Flex)`

    width: 800px;
    height: auto;
    max-width: 1024px;

    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    padding: 20px;


    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    @media(max-width: 968px) {
        width: 100%;
    }

    form {
        width: 100%;
        height: 100%;
        
        padding: 10px;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;   
    }

`;

export const Content = styled(Flex)`
 
    width: 100%;
    height: 100%;


    padding: 5px;

`;


export const SelectForm = styled(Select)`
    width: 100%;
    padding: 10px;

    color: darkgrey;

    @media(max-width: 968px) {
        font-size: 15px;

        option {
            font-size: 12px;
        }
    }
`;

export const ButtonSubmit = styled(Button)`


    width: 300px;
    height: 60px;
    color: #FFF;

    margin: 10px;

    @media(max-width: 968px) {
        width: 100%;
    }

`;