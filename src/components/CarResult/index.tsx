import React from "react";
import * as S from './styles';

export function CarResult({ carResult }) {
    console.log(carResult);
    
    return (
        <S.Container>          
            <S.BrandName as={'h3'}>Tabela Fipe: Preço {carResult.model}</S.BrandName>    
            <S.Price as={'span'}>{carResult.price}</S.Price> 
            <S.Texts as={'p'}>Esse é o preco de compra do veículo</S.Texts>
        </S.Container>
    )
}