import React, { useContext } from 'react';
import { Container, Grid, Row } from './styles';
import { ThemeContext } from "styled-components";

interface GridCustomProps {
  //adicionar os props
  options: Array<any>;
  title:string;
  tipo:"P"|"M"
}


export const GridCustom: React.FC<GridCustomProps> = (props) => {
  const { colors, title } = useContext(ThemeContext);
  return <Container>
    <strong>{props.title}</strong>
    <Grid >
      {props.options.map(item => {
        return <Row style={{ background: props.tipo==="M" ? colors.primary:colors.tertiary}}>
          <img src={item.image} alt='foto' />
          <div className='ml-2'>
            <label>{item.nome}</label>
            <p style={{ color: props.tipo==="M" ? "":colors.warning}}>{item.text}</p>
          </div>
        </Row>
      })}
    </Grid>
  </Container>;
}