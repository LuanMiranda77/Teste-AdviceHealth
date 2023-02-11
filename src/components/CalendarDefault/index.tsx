import React from 'react';
import { Calendar } from 'react-calendar';
import { Container } from './styles';

interface CalendarDefaultProps{
  //adicionar os props
  className?:string;
}

export const CalendarDefault: React.FC< CalendarDefaultProps> = (props) => {
  return <Container className={props.className}>
            <Calendar />
         </Container>;
}