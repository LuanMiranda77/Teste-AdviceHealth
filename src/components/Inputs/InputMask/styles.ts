import styled from "styled-components";

export const Container  = styled.div`

    //adicionar stylos
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;


.input_line__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid ${color => color.theme.colors.primary};
  border-radius: 0px 0px 0px 5px;
  outline: 0;
  /* font-size: 1.3rem; */
  color: ${color => color.theme.colors.black};;
  padding: 7px 9px;
  background: transparent;
  transition: border-color 0.2s;

  
  &:placeholder-shown ~ .input_line__label {
    /* font-size: 1.3rem; */
    cursor: text;
    top: 20px;
  }
}

.input_line__label {
  position: absolute;
  top: 0px;
  display: block;
  transition: 0.2s;
  font-size: 14px;
  color: ${color=>(color.theme.title === 'dark' ? color.theme.colors.textLabel : color.theme.colors.primary)};
  font-weight:bold;
}

.input_line__field:focus {
  ~ .input_line__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: ${color => color.theme.colors.primary};;
    font-weight:700;    
  }
  padding-bottom: 6px;  
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, ${color => color.theme.colors.secondary},${color => color.theme.colors.secondary});
  border-image-slice: 1;
}
/* reset input */
.input_line__field{
  &:required,&:invalid { box-shadow:none; }
}

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

