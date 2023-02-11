import styled from "styled-components";

export const Container  = styled.div`

    //adicionar stylos

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

export const Grid  = styled.ul`

    //adicionar stylos
    width: 100%;
    overflow-y: auto;
    max-height: 96%;

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

export const Row  = styled.li`

    //adicionar stylos
    margin:5px ;
    padding: 10px;
    border-radius: 10px ;
    display: flex;
    font-family:"dosis" ;

    img{
        border-radius: 200px;
        height: 60px;
        width: 60px;
    }

    label{
        width:100% ;
        color:${color => color.theme.colors.black};
        font-weight: bold;
        font-size: 25px;
    }
    p{
        width:100% ;
        color:${color => color.theme.colors.secondary};
        font-weight: bold;
        margin-top: -5px;
    }

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;


export const FormContainer  = styled.form`
    //adicionar stylos

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;
