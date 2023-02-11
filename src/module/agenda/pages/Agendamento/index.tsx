import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaCalendarPlus, FaClipboardCheck, FaCube, FaPen, FaSave, FaTrash, FaUserPlus } from "react-icons/fa";
import { ThemeContext } from "styled-components";
import * as yup from "yup";
import { ButtonBase, ButtonIcon, CalendarDefault, Divider, GridCustom, InputDate, InputDefault, InputMask, InputSelectDefault, ModalDefault } from "../../../../components";
import { AgendamentoType, PacienteType } from '../../../../domain';
import jsonUfs from '../../../../helpers/help_lista_uf.json';
import json from '../../../../helpers/help_sexos.json';
import horarios from '../../../../helpers/help_horas.json';
import { Container, FormContainer, Grid, Row } from './styles';
import Lista from './list';

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
    cpf: '',
    sexo: '',
    dtNasc: '',
    cep: '',
    logradouro: '',
    numero: '',
    cidade: '',
    uf: '',
    telefone: '',
    email: '',
  } as PacienteType;
  
  const initialStateConsulta = {
    data: new Date(),
    hora: "",
    paciente: initialState,
    medico: "",
    formaPagamento:"",
    valor: 0,
  } as AgendamentoType;

  const [paciente, setPaciente] = useState<PacienteType>(initialState);
  const [agendamento, setAgendamento] = useState<AgendamentoType>(initialStateConsulta);

  const schema = yup.object().shape({
    nome: yup.string().required('O campo é obrigatório'),
    email: yup.string().email().required('O campo é obrigatório'),
    password: yup.string().min(6, 'Digite no minímo 6 caracteres').required('O campo é obrigatório'),
    confirmePass: yup.string().oneOf([yup.ref("password")], "As senhas não são iguais").required('O campo é obrigatório')
  }).required();

  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const options = [
    { image: "https://ef564920920608e03abb-7d34ef097b6ab6c586dfc84157128505.ssl.cf1.rackcdn.com/PostImagem/36734/foto-de-perfil-profissional_o1eh30s23krp31qn41l3havc2fti.JPG", nome: "Dr. Marcus filho", text: "Clínico Geral" },
    { image: "https://photografos.com.br/wp-content/uploads/2020/09/fotografia-para-perfil.jpg", nome: "Dr. Luíz Braga", text: "Clínico Geral" },
    { image: "https://i.pinimg.com/originals/5a/72/e1/5a72e1f05f9e2e1b76a8438a7490dc3b.jpg", nome: "Dr. Muito doido", text: "Ucologista" },
    { image: "https://vocesa.abril.com.br/wp-content/uploads/2021/01/Dani-Almeida-pe%CC%81-de-pa%CC%81gina.jpg?quality=70&strip=info", nome: "Dra. Patricia", text: "Pediatra" },
    { image: "https://ef564920920608e03abb-7d34ef097b6ab6c586dfc84157128505.ssl.cf1.rackcdn.com/PostImagem/36734/foto-de-perfil-profissional_o1eh30s23krp31qn41l3havc2fti.JPG", nome: "Dr. Marcus filho", text: "Clínico Geral" },
  ]

  const agendas = [
    { data: "2023-02-12", hora: "08:00", image: 'https://img.freepik.com/vetores-premium/homem-perfil-caricatura_18591-58482.jpg?w=740', nome: 'Paciente-1', procedimento: 'Consulta' },
    { data: "2023-02-15", hora: "08:00", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Foto_Perfil.jpg/600px-Foto_Perfil.jpg', nome: 'Paciente-1', procedimento: 'Consulta' },
    { data: "2023-02-12", hora: "08:30", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Foto_Perfil.jpg/600px-Foto_Perfil.jpg', nome: 'Paciente-1', procedimento: 'Consulta' },
    { data: "2023-02-13", hora: "08:00", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Foto_Perfil.jpg/600px-Foto_Perfil.jpg', nome: 'Paciente-1', procedimento: 'Consulta' },
    { data: "2023-02-15", hora: "08:00", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Foto_Perfil.jpg/600px-Foto_Perfil.jpg', nome: 'Paciente-1', procedimento: 'Consulta' },
    { data: "2023-02-20", hora: "08:00", image: 'https://img.freepik.com/vetores-premium/homem-perfil-caricatura_18591-58482.jpg?w=740', nome: 'Paciente-1', procedimento: 'Consulta' },
    { data: "2023-02-12", hora: "09:00", image: 'https://img.freepik.com/vetores-premium/homem-perfil-caricatura_18591-58482.jpg?w=740', nome: 'Paciente-1', procedimento: 'Consulta' },
    { data: "2023-02-12", hora: "09:30", image: '', nome: '', procedimento: '' },
    { data: "2023-02-30", hora: "08:00", image: '', nome: '', procedimento: '' },
    { data: "2023-02-22", hora: "08:00", image: '', nome: '', procedimento: '' },
    { data: "2023-02-12", hora: "10:00", image: '', nome: '', procedimento: '' },
  ];


  const closeModal = () => {
    setShowModal(false);
  }

  const onSave = (form: FieldValues) => {

  }

  return <Container className="p-3 h-full" style={{ backgroundColor: (title === 'dark' ? colors.tertiary : colors.white), borderRadius: '8px' }}>
    
    <header>
      <div className="flex items-center justify-between text-2xl font-bold" style={{ color: (title === 'dark' ? colors.white : colors.primary), fontFamily: 'Dosis' }}>
        <div className="flex items-center">
          <FaCube className="mr-2" />
          <label htmlFor="">Agenda</label>
        </div>
        <FaCalendarPlus className="cursor-pointer" title='Ir para os agendamentos feitos' onClick={()=>setShowModal2(true)}/>
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
              {item.nome !== "" ? <img src={item.image} alt='foto' /> : <></>}
              <div className='ml-2 w-full'>
                <label >{item.nome}</label>
                <p style={{ color: colors.primary }}>{item.procedimento}</p>
              </div>
              <div className="flex justify-center items-center">
                {item.nome !== "" ?
                  <div className="flex justify-center items-center">
                    <FaPen className="mr-2 text-xl cursor-pointer" title='Editar' style={{ color: colors.primary }} />
                    <FaTrash className="mr-2 text-xl cursor-pointer" title='Apagar' style={{ color: colors.error }} />
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
                  register={register('nome')}
                  errorMessage={errors.nome?.message}
                />
                <div className='flex'>
                  <div className='w-6/12 mr-2'>
                    <InputSelectDefault label='Sexo'
                      options={json.sexos}
                      // defaultValue={cargos[2]}
                      value={_.find(json.sexos, { 'value': paciente.sexo })}
                      onChange={(e) => setPaciente({ ...paciente, sexo: e.value })}
                      isSearchable={false}
                      placeholder='Sexo...'
                      required
                    />
                  </div>
                  <div className='w-6/12 mr-2'>
                    <InputDate className='text-left' label='Data nascimento' />
                  </div>
                </div>
              </div>
              <div className='text-left w-2/12'>
                <label className='text-title' htmlFor="">Observações</label>
                <textarea id="w3review" name="w3review" rows={6} cols={28} style={{ border: '2px solid ' + colors.primary }}></textarea>
              </div>
            </div>

            <div className='mb-6'>
              <p className='font-bold text-xs text-left text-title mb-2' style={{ color: (title === 'dark' ? colors.textLabel : colors.tertiary) + ' !important' }}>Endereço</p>
              <Divider tipo='horizontal' />

              <div className='flex'>
                <InputMask className='w-2/12 mr-6 mb-2' label='Cep'
                  mask={'99999-999'}
                  value={paciente.cpf}
                  required
                  onChange={(e) => setPaciente({ ...paciente, cpf: e.target.value })}
                />
                <InputDefault className='mr-2 w-full' label='Logradouro' type='text' />
              </div>

              <div className='flex'>
                <InputDefault className='mr-2 w-4/12' label='Cidade' type='text' />
                <InputDefault className='mr-2 w-5/12' label='Bairro' type='text' />
                <div className='w-3/12 mr-2'>
                  <InputSelectDefault label='UF'
                    options={jsonUfs.estados}
                    // defaultValue={cargos[2]}
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
              <InputDefault className='w-full mr-6 mt-1 mb-5' label='Médico' type='text' />
              <div className='flex'>
                <div className='w-6/12 mr-2'>
                  <InputDate className='text-left' label='Data nascimento' />
                </div>
                <div className='w-6/12'>
                  <InputSelectDefault label='Hora'
                    options={horarios.array}
                    // defaultValue={cargos[2]}
                    value={_.find(horarios.array, { 'value': paciente.uf })}
                    onChange={(e) => setPaciente({ ...paciente, uf: e.value })}
                    isSearchable={false}
                    placeholder='Estado...'
                  />
                </div>
              </div>
            </div>

            <div>
              <p className='font-bold text-xs text-left text-title mb-2' style={{ color: (title === 'dark' ? colors.textLabel : colors.tertiary) + ' !important' }}>Dados do agendamento</p>
              <Divider tipo='horizontal' />
              <div className='w-6/12'>
                <InputSelectDefault label='Forma de pagamento'
                  options={jsonUfs.estados}
                  // defaultValue={cargos[2]}
                  value={_.find(jsonUfs.estados, { 'value': paciente.uf })}
                  onChange={(e) => setPaciente({ ...paciente, uf: e.value })}
                  isSearchable={false}
                  placeholder='Estado...'
                />
              </div>

              <div className='card-local-2 p-2 mt-10'>
                <p className='text-left font-bold'>Valor total</p>
                <span className='text-5xl font-bold text-red-700'>R$ 120,00</span>
              </div>
            </div>

          </div>
        </div>
        <footer>
        <div className="flex justify-between" style={{ bottom: 20, right: 15, position: 'absolute' }}>
              <ButtonBase label="CANCELAR" model="btn_line" className="primary-color mr-60  w-32" size="large" onClick={() => setShowModal(false)} />
              <ButtonIcon className="mr-3 ml-6" label="SALVAR" icon={<FaSave />} width={'50%'} type='submit' />
            </div>
        </footer>

      </FormContainer>


    </ModalDefault>
    <Lista showModal={showModal2} closeModal={()=>setShowModal2(false)} options={[]}/>
  </Container>;
}
export default Agendamento;