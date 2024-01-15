import { Flex, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const Container = styled(Flex)`

    width: 100%;

    align-items: center;
    justify-content: center;
    flex-direction: column;

    background-color: #FFF;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

`;


export const Title = styled(Text)`
    font-size: 35px;
    font-weight: 700;
`;

export const SubTitle = styled(Text)`

    font-size: 20px;
    font-weight: 600;

    margin: 10px;
`;