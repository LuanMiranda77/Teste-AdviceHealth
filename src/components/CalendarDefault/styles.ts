import styled from "styled-components";

export const Container  = styled.div`
    //adicionar stylos
    .react-calendar{
        width: 100%;
        height: 100%;
        border: none;
        background-color: #ECEEF4;
        border-radius: 10px;
        font-family: 'Dosis';
    }

    .react-calendar span{
        font-weight: bold;
        color: ${color=>color.theme.colors.primary};
    }

    .react-calendar__navigation button{
        font-weight: bold;
        color: ${color=>color.theme.colors.primary};
    }

    .react-calendar__tile--now{
        background-color: ${color=>color.theme.colors.secondary};
        border-radius: 5px;
        font-weight: bold;
    }

    .react-calendar__tile--active{
        background-color: ${color=>color.theme.colors.primary};
        border-radius: 5px;
        font-weight: bold;
    }


@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

