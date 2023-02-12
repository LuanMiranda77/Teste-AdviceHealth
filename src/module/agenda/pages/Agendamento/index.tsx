import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaCalendarPlus, FaClipboardCheck, FaCube, FaPen, FaSave, FaTrash, FaUserPlus } from "react-icons/fa";
import { toast } from 'react-toastify';
import { ThemeContext } from "styled-components";
import * as yup from "yup";
import { ButtonBase, ButtonIcon, CalendarDefault, Divider, GridCustom, InputDate, InputDefault, InputFileProduto, InputMask, InputNumber, InputSelectDefault, ModalDefault } from "../../../../components";
import { AgendamentoType, PacienteType } from '../../../../domain';
import horarios from '../../../../helpers/help_horas.json';
import jsonUfs from '../../../../helpers/help_lista_uf.json';
import json from '../../../../helpers/help_sexos.json';
import { UtilsConvert } from '../../../../utils/utils_convert';
import { UtilsGeral } from '../../../../utils/utils_geral';
import Lista from './list';
import { Container, FormContainer, Grid, Row } from './styles';

/**
*@Author
*@Issue
*/

function Agendamento() {

  const { colors, title } = useContext(ThemeContext);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const initialState = {
    nome: '',
    foto: 'https://img.freepik.com/vetores-premium/homem-perfil-caricatura_18591-58482.jpg?w=2000',
    cpf: '',
    sexo: '',
    dtNasc: '',
    cep: '',
    logradouro: '',
    numero: '',
    cidade: '',
    bairro: '',
    uf: '',
    telefone: '',
    email: '',
  } as PacienteType;

  const initialStateConsulta = {
    data: new Date(),
    hora: "",
    paciente: initialState,
    medico: "",
    formaPagamento: "",
    procedimento: "Consulta",
    valor: 0,
  } as AgendamentoType;

  const [paciente, setPaciente] = useState<PacienteType>(initialState);
  const [agendamento, setAgendamento] = useState<AgendamentoType>(initialStateConsulta);

  const schema = yup.object().shape({
    nome: yup.string().required('O campo é obrigatório'),
    cpf: yup.string().required('O campo é obrigatório'),
    email: yup.string().email().required('O campo é obrigatório'),
  }).required();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const options = [
    { image: "https://ef564920920608e03abb-7d34ef097b6ab6c586dfc84157128505.ssl.cf1.rackcdn.com/PostImagem/36734/foto-de-perfil-profissional_o1eh30s23krp31qn41l3havc2fti.JPG", nome: "Dr. Marcus filho", text: "Clínico Geral" },
    { image: "https://photografos.com.br/wp-content/uploads/2020/09/fotografia-para-perfil.jpg", nome: "Dr. Luíz Braga", text: "Clínico Geral" },
    { image: "https://i.pinimg.com/originals/5a/72/e1/5a72e1f05f9e2e1b76a8438a7490dc3b.jpg", nome: "Dr. Muito doido", text: "Ucologista" },
    { image: "https://vocesa.abril.com.br/wp-content/uploads/2021/01/Dani-Almeida-pe%CC%81-de-pa%CC%81gina.jpg?quality=70&strip=info", nome: "Dra. Patricia", text: "Pediatra" },
    { image: "https://ef564920920608e03abb-7d34ef097b6ab6c586dfc84157128505.ssl.cf1.rackcdn.com/PostImagem/36734/foto-de-perfil-profissional_o1eh30s23krp31qn41l3havc2fti.JPG", nome: "Dr. Marcus filho", text: "Clínico Geral" },
  ]

  const [agendas, setAgenda] = useState([
    { data: new Date("2023-02-12"), hora: "08:00", paciente: { cpf: '40665598996', nome: 'Pciente-1', foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Foto_Perfil.jpg/600px-Foto_Perfil.jpg' } as PacienteType, medico: 'Dr. Marcus Filho', formaPagamento: "D", valor: 0, procedimento: 'Consulta' },
    { data: new Date("2023-02-12"), hora: "08:30", paciente: { cpf: '40665598996', nome: 'Pciente-1', foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Foto_Perfil.jpg/600px-Foto_Perfil.jpg' } as PacienteType, medico: 'Dr. Marcus Filho', formaPagamento: "D", valor: 0, procedimento: 'Consulta' },
    { data: new Date("2023-02-12"), hora: "09:00", paciente: { cpf: '40665598996', nome: 'Pciente-1', foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Foto_Perfil.jpg/600px-Foto_Perfil.jpg' } as PacienteType, medico: 'Dr. Marcus Filho', formaPagamento: "D", valor: 0, procedimento: 'Consulta' },
    { data: new Date("2023-02-12"), hora: "09:30", paciente: null, medico: '', formaPagamento: "", valor: 0, procedimento: '' },
    { data: new Date("2023-02-12"), hora: "10:00", paciente: null, medico: '', formaPagamento: "", valor: 0, procedimento: '' },
    { data: new Date("2023-02-12"), hora: "10:30", paciente: null, medico: '', formaPagamento: "", valor: 0, procedimento: '' },
    { data: new Date("2023-02-12"), hora: "11:00", paciente: null, medico: '', formaPagamento: "", valor: 0, procedimento: '' },
    { data: new Date("2023-02-12"), hora: "11:30", paciente: null, medico: '', formaPagamento: "", valor: 0, procedimento: '' },
    { data: new Date("2023-02-12"), hora: "12:00", paciente: null, medico: '', formaPagamento: "", valor: 0, procedimento: '' },
    { data: new Date("2023-02-12"), hora: "12:30", paciente: null, medico: '', formaPagamento: "", valor: 0, procedimento: '' },
    { data: new Date("2023-02-12"), hora: "13:00", paciente: null, medico: '', formaPagamento: "", valor: 0, procedimento: '' },

  ]);

  const formasPagamentos = [
    { value: 'D', label: 'Dinheiro' },
    { value: 'P', label: 'Pix' },
    { value: 'C', label: 'Cartão' },
  ];


  const closeModal = () => {
    setShowModal(false);
    setAgendamento(initialStateConsulta);
    setPaciente(initialState);
    reset({ ...initialState });
  }

  const onSave = (form: FieldValues) => {
    if(agendamento.hora == ""){
      toast.error("Você esqueceu de escolher um horario");
      return
    }

    let agenda = { ...agendamento };
    agenda.paciente = { ...paciente };
    let array = agendas.map(item => {
      if(item.hora === agenda.hora){
        item = {...agenda}
      }
      return item
    });

  
    setAgenda(array);
    setAgendamento(initialStateConsulta);
    setPaciente(initialState);
    toast.success(UtilsGeral.getEmogi()[1] + " Agendado com sucesso.");
    setShowModal(false);
  }

  const onRowEdit = (agenda: AgendamentoType) => {
    setAgendamento(agenda);
    if(agenda.paciente != null){
      setPaciente(agenda.paciente);
    }
    reset({ ...agenda.paciente });
    setShowModal(true);
  }

  const onRowDel = (agenda: AgendamentoType) =>{
    agenda.paciente = null;
    agenda.medico="";
    agenda.formaPagamento='';
    agenda.valor=0;
    agenda.procedimento='';

    let array = agendas.map(item => {
      if(item.hora === agenda.hora){
        item = {...agenda}
      }
      return item
    });
    setAgenda(array);

  }

  const uploadFoto = () => {

  }

  return <Container className="p-3 h-full" style={{ backgroundColor: (title === 'dark' ? colors.tertiary : colors.white), borderRadius: '8px' }}>

    <header>
      <div className="flex items-center justify-between text-2xl font-bold" style={{ color: (title === 'dark' ? colors.white : colors.primary), fontFamily: 'Dosis' }}>
        <div className="flex items-center">
          <FaCube className="mr-2" />
          <label htmlFor="">Agenda</label>
        </div>
        <FaCalendarPlus className="cursor-pointer" title='Ir para os agendamentos feitos' onClick={() => setShowModal2(true)} />
      </div>
      <Divider tipo="horizontal" />
    </header>

    <div className="flex">
      <div className="w-5/12" style={{ height: 'calc(100vh - 425px)' }}>
        <CalendarDefault className='mb-3 mt-3' />
        <GridCustom options={options} title="Quadro de médicos" tipo="M" />
      </div>

      <div className="w-7/12 card-local-2 mt-3 ml-3 p-2" style={{ height: 'calc(100vh - 145px)' }}>
        <strong style={{ color: (title === 'dark' ? colors.white : colors.black), fontFamily: 'Dosis' }}>Agendas do dia</strong>
        <Grid >
          {agendas.map(item => {
            return <Row style={{ background: colors.white }}>
              <div className="h-full flex items-center mr-5 mt-2">
                <label htmlFor="" style={{ color: (title === 'dark' ? colors.white : colors.black), fontFamily: 'Dosis' }}>{item.hora}</label>
              </div>
              {item.paciente != null ? <img src={item.paciente.foto} alt='foto' /> : <></>}
              <div className='ml-2 w-full'>
                <label >{item.paciente?.nome}</label>
                <p style={{ color: colors.primary }}>{item.procedimento}</p>
              </div>
              <div className="flex justify-center items-center">
                {item.paciente != null ?
                  <div className="flex justify-center items-center">
                    <FaPen className="mr-2 text-xl cursor-pointer" title='Editar' style={{ color: colors.primary }} onClick={() => onRowEdit(item)} />
                    <FaTrash className="mr-2 text-xl cursor-pointer" title='Apagar' style={{ color: colors.error }} onClick={()=>onRowDel(item)} />
                    <FaClipboardCheck className="text-xl cursor-pointer" title='Finalizar' style={{ color: colors.warning }} />
                  </div>
                  :
                  <FaUserPlus className="text-3xl cursor-pointer" title='Novo agendamento' style={{ color: colors.primary }} onClick={() => setShowModal(true)} />
                }
              </div>
            </Row>
          })}
        </Grid>
      </div>
    </div>

    {/* formulario da agenda */}
    <ModalDefault
      isOpen={showModal}
      title='Ficha de paciente / pagamento'
      onRequestClose={closeModal}
      width='96%'
      margin='1%'
      height='96%'
      left='2%'
    >
      <FormContainer onSubmit={handleSubmit(onSave)}>
        <div className="flex">
          <div className="w-7/12 mr-3">
            <div className='mb-2'>
              <p className='font-bold text-xs text-left text-title mb-2' style={{ color: (title === 'dark' ? colors.textLabel : colors.tertiary) + ' !important' }}>Principais</p>
              <Divider tipo='horizontal' />
            </div>

            <div className='flex mb-6'>
              <div className='w-8/12'>
                <InputMask className='w-5/12 mr-6 mb-2' label='CPF'
                  mask={'999.999.999-99'}
                  value={paciente.cpf}
                  required
                  onChange={(e) => setPaciente({ ...paciente, cpf: e.target.value })}
                />
                <InputDefault className='mr-2 mb-2' label='Nome' type='text'
                  required
                  value={paciente.nome}
                  onChange={(e) => setPaciente({ ...paciente, nome: e.target.value })}
                  // register={register('nome')}
                  // errorMessage={errors.nome?.message}
                />
                <div className='flex'>
                  <div className='w-6/12 mr-2'>
                    <InputSelectDefault label='Sexo'
                      options={json.sexos}
                      defaultValue={json.sexos[0]}
                      value={_.find(json.sexos, { 'value': paciente.sexo })}
                      onChange={(e) => setPaciente({ ...paciente, sexo: e.value })}
                      isSearchable={false}
                      placeholder='Sexo...'
                    />
                  </div>
                  <div className='w-6/12 mr-2'>
                    <InputDate className='text-left' label='Data nascimento'
                      defaultValue={"" + paciente.dtNasc}
                      onChange={(e) => setPaciente({ ...paciente, dtNasc: e.target.value })} />
                  </div>
                </div>
              </div>
              <div className='text-left w-2/12'>
                <label className='text-title' htmlFor="">Observações</label>
                <textarea id="w3review" name="w3review" rows={6} cols={28} style={{ border: '2px solid ' + colors.primary }} />
              </div>
            </div>

            <div className='mb-6'>
              <p className='font-bold text-xs text-left text-title mb-2' style={{ color: (title === 'dark' ? colors.textLabel : colors.tertiary) + ' !important' }}>Endereço</p>
              <Divider tipo='horizontal' />

              <div className='flex'>
                <InputMask className='w-2/12 mr-6 mb-2' label='Cep'
                  mask={'99999-999'}
                  value={paciente.cep}
                  onChange={(e) => setPaciente({ ...paciente, cep: e.target.value })}
                />
                <InputDefault className='mr-2 w-full' label='Logradouro' type='text'
                  value={paciente.logradouro}
                  onChange={(e) => setPaciente({ ...paciente, logradouro: e.target.value })} />
              </div>

              <div className='flex'>

                <InputDefault className='mr-2 w-4/12' label='Cidade' type='text'
                  value={paciente.cidade}
                  onChange={(e) => setPaciente({ ...paciente, cidade: e.target.value })}
                />

                <InputDefault className='mr-2 w-5/12' label='Bairro' type='text'
                  value={paciente.bairro}
                  onChange={(e) => setPaciente({ ...paciente, bairro: e.target.value })}
                />

                <div className='w-3/12 mr-2'>
                  <InputSelectDefault label='UF'
                    options={jsonUfs.estados}
                    // defaultValue={jsonUfs.estados[2]}
                    value={_.find(jsonUfs.estados, { 'value': paciente.uf })}
                    onChange={(e) => setPaciente({ ...paciente, uf: e.value })}
                    isSearchable={false}
                    placeholder='Estado...'
                  />
                </div>

              </div>
            </div>

            <div className=''>
              <p className='font-bold text-xs text-left text-title mb-2' style={{ color: (title === 'dark' ? colors.textLabel : colors.tertiary) + ' !important' }}>Contato</p>
              <Divider tipo='horizontal' />
              <div className='flex'>
                <InputDefault className='w-6/12 mr-6 mt-1' label='Email' type='email'
                  register={register('email')}
                  errorMessage={errors.email?.message}
                />
                <InputMask className='w-3/12 mr-6 mb-5' label='Celular'
                  mask={'(99)9.9999-9999'}
                  value={paciente.telefone}
                  onChange={(e) => setPaciente({ ...paciente, telefone: e.target.value })}
                />
              </div>
            </div>
          </div>

          <Divider tipo='vertical' className='mr-3 h-100' size={2} />

          <div className="w-5/12">

            <div className='mb-24'>
              <p className='font-bold text-xs text-left text-title mb-2' style={{ color: (title === 'dark' ? colors.textLabel : colors.tertiary) + ' !important' }}>Dados do agendamento</p>
              <Divider tipo='horizontal' />
              <InputDefault className='w-full mr-6 mt-1 mb-5' label='Médico' type='text' value={agendamento.medico}
                onChange={(e) => setAgendamento({ ...agendamento, medico: e.target.value })} />
              <div className='flex'>
                <div className='w-6/12 mr-2'>
                  <InputDate className='text-left' label='Data'
                    defaultValue={"" + agendamento.data}
                    onChange={(e) => setAgendamento({ ...agendamento, data: new Date(e.target.value) })} />
                </div>
                <div className='w-6/12'>
                  <InputSelectDefault label='Hora'
                    options={horarios.array}
                    // defaultValue={cargos[2]}
                    value={_.find(horarios.array, { 'value': agendamento.hora })}
                    onChange={(e) => setAgendamento({ ...agendamento, hora: e.value })}
                    isSearchable={false}
                    placeholder='00:00'
                  />
                </div>
              </div>
            </div>

            <div>
              <p className='font-bold text-xs text-left text-title mb-2' style={{ color: (title === 'dark' ? colors.textLabel : colors.tertiary) + ' !important' }}>Dados do agendamento</p>
              <Divider tipo='horizontal' />
              <div className='w-6/12'>
                <InputSelectDefault label='Forma de pagamento'
                  options={formasPagamentos}
                  defaultValue={formasPagamentos[0]}
                  value={_.find(formasPagamentos, { 'value': agendamento.formaPagamento })}
                  onChange={(e) => setAgendamento({ ...agendamento, formaPagamento: e.value })}
                  isSearchable={false}
                  placeholder='Estado...'
                />
              </div>

              <div className='card-local-2 p-2 mt-5'>
                <p className='text-left font-bold'>Valor do procedimento</p>
                <InputNumber id='saldoPagar' className='h-20 text-4xl text-center mb-5'
                  label=''
                  prefixo=''
                  fixedZeroFinal
                  separadorMilhar={'.'}
                  casaDecimal={2}
                  separadorDecimal={','}
                  placeholder='R$ 0,00'
                  value={agendamento.valor}
                  onChange={(e) => setAgendamento({ ...agendamento, valor:Number(e.currentTarget.value.replaceAll(',', '.'))})}
                />
                {/* <span className='text-5xl font-bold text-red-700'>{UtilsConvert.formatCurrency(agendamento.valor)}</span> */}
              </div>
            </div>

          </div>
        </div>
        <footer>
          <div className="flex justify-between" style={{ bottom: 20, right: 15, position: 'absolute' }}>
            <ButtonBase label="CANCELAR" model="btn_line" className="primary-color mr-60  w-32" size="large" onClick={() => setShowModal(false)} />
            <ButtonIcon className="mr-3 ml-6" label="SALVAR" icon={<FaSave />} width={'50%'} onClick={onSave} />
          </div>
        </footer>

      </FormContainer>


    </ModalDefault>
    <Lista showModal={showModal2} closeModal={() => setShowModal2(false)} options={[]} />
  </Container>;
}
export default Agendamento;