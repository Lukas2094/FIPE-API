import { Flex, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';


export const Container = styled(Flex)`


    width: 100%;
    height: auto;

    align-items: center;
    justify-content: center;
    flex-direction: column;

    margin: 15px 0;
    padding: 30px;
    background-color: aquamarine;
    border-radius: 7px;
`;

export const BrandName = styled(Text)`

    font-size: 22px;
    font-weight: 700;
    word-break: break-all;

    @media(max-width: 968px) {
        font-size: 12px;
    }

`;

export const Price = styled(Flex)`
    
    width: auto;
    height: 47px;

    padding: 10px;
    margin: 15px 0;

    justify-content: center;
    align-items: center;

    color: #FFF;
    font-weight: bold;
    font-size: 18px;

    border-radius: 25px;
    background-color: seagreen;

`;

export const Texts = styled(Text)`
 
    font-size: 13px;
    font-weight: 400;

`;