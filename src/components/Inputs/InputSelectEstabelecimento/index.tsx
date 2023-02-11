import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { ThemeContext } from 'styled-components';
import { api } from "../../../config/api";
import { EstabelecimentoType } from '../../../domain';
import { Cargo } from '../../../domain/enums';
import { load, selectStateEstab } from '../../../store/slices/estabelecimento.slice';
import { loadEstabelecimentos, selectStateEstabelecimentos } from '../../../store/slices/estabelecimentos.slice';
import { persistLocalStorage } from '../../../utils/persistLocalStorage';
import { UtilsGeral } from '../../../utils/utils_geral';
import { UtilsUserLocal } from '../../../utils/utils_userLocal';
import { ModalLoad } from '../../Modal/ModalLoad';
import { ToastDefault } from '../../ToastDefault';
import { Container } from './styles';

interface InputSelectEstabelecimentoProps {
  //adicionar os props

}

export const InputSelectEstabelecimento: React.FC<InputSelectEstabelecimentoProps> = () => {
  const [options, setOptions] = useState(new Array<any>());
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [selectedEstabelecimento, setSelectedEstabelecimento] = useState<any>();
  const dispatch = useDispatch();
  const estabelecimento = useSelector(selectStateEstab);
  const estabelecimentos = useSelector(selectStateEstabelecimentos);
  const { colors, title } = useContext(ThemeContext);

  useEffect(() => {
    setModalShow(true);
    let user = UtilsUserLocal.getTokenLogin();
    if (user.cargo == Cargo.MASTER || user.cargo == Cargo.REVENDA) {
      user.estabelecimento = 0;
    }
    let estabelecimento = {
      razao: "WAS Sociação",
      nome:"Clinica vida",
      email:"",
      celular1: "",
      cnpj:"15.255.266/0001-59"

    } as EstabelecimentoType;
    dispatch(load(estabelecimento));
    
    setModalShow(false);
  }, [selectedEstabelecimento])

  const onSelect = (event: any) => {
    let selectEstabelecimento = _.find(estabelecimentos, { 'id': event.value });
    if (selectEstabelecimento) {
      // persistLocalStorage('@selected-est', selectEstabelecimento, 'set');
      // setSelectedEstabelecimento(selectEstabelecimento);
      dispatch(load(selectEstabelecimento));
    }
  }

  return <Container className='font-bold'>

    {options.length > 1 ?
      <Select id='select-estabelecimento'
        className='input'
        options={options}
        placeholder='Selecione o estabelecimento...'
        isSearchable={true}
        isClearable={true}
        onChange={(e) => { onSelect(e) }}
        // defaultValue={options[0]}
      />
      :
      <div className='ml-1' style={{marginTop:'-3px'}}>
        <p className='text-lg font-bold' style={{color: colors.textLabel}}>{estabelecimento.nome}</p>
        <p className='text-xs' style={{color: colors.warning}}>CNPJ: {estabelecimento.cnpj}</p>
      </div>
    }
    <ModalLoad isOpen={modalShow} mensage='Carregando dados iniciais do estabelecimento aguarde...' onRequestClose={()=>setModalShow(false)}/>
  </Container>;
}