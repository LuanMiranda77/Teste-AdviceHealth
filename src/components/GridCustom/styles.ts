import styled from "styled-components";

export const Container  = styled.div`

    //adicionar stylos
    background-color:#ECEEF4;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    padding: 0.5rem;

    strong{
        font-size:20px;
        font-family: "Dosis";
        font-weight: bold;
    }

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;


export const Grid  = styled.ul`

    //adicionar stylos
    width: 100%;
    overflow-y: auto;
    height: 85%;
    /* max-height: 85%; */

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
        color:${color => color.theme.colors.white};
        font-weight: bold;
        font-size: 30px;
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
