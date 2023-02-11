import { Column } from "devextreme-react/data-grid";
import { useContext } from "react";
import Calendar from 'react-calendar';
import CountUp from 'react-countup';
import { FaClipboardCheck, FaPen, FaTrash } from "react-icons/fa";
import { ThemeContext } from "styled-components";
import { CalendarDefault, DataGridDefault, GridCustom, SummaryCustom } from "../../../../components";
import { UtilsGeral } from '../../../../utils/utils_geral';


import { Container } from './styles';

/**
*@Author
*@Issue
*/

function Dashboard() {
      const {colors, title} = useContext(ThemeContext);
      const options = [
            { image: "https://ef564920920608e03abb-7d34ef097b6ab6c586dfc84157128505.ssl.cf1.rackcdn.com/PostImagem/36734/foto-de-perfil-profissional_o1eh30s23krp31qn41l3havc2fti.JPG", nome: "Dr. Marcus filho", text: "Clínico Geral" },
            { image: "https://photografos.com.br/wp-content/uploads/2020/09/fotografia-para-perfil.jpg", nome: "Dr. Luíz Braga", text: "Clínico Geral" },
            { image: "https://i.pinimg.com/originals/5a/72/e1/5a72e1f05f9e2e1b76a8438a7490dc3b.jpg", nome: "Dr. Muito doido", text: "Ucologista" },
            { image: "https://vocesa.abril.com.br/wp-content/uploads/2021/01/Dani-Almeida-pe%CC%81-de-pa%CC%81gina.jpg?quality=70&strip=info", nome: "Dra. Patricia", text: "Pediatra" },
            { image: "https://ef564920920608e03abb-7d34ef097b6ab6c586dfc84157128505.ssl.cf1.rackcdn.com/PostImagem/36734/foto-de-perfil-profissional_o1eh30s23krp31qn41l3havc2fti.JPG", nome: "Dr. Marcus filho", text: "Clínico Geral" },
      ]

      const options2 = [
            { image: "https://ef564920920608e03abb-7d34ef097b6ab6c586dfc84157128505.ssl.cf1.rackcdn.com/PostImagem/36734/foto-de-perfil-profissional_o1eh30s23krp31qn41l3havc2fti.JPG", nome: "Luan miranda", text: "Dr. Marcus filho" },
            { image: "https://photografos.com.br/wp-content/uploads/2020/09/fotografia-para-perfil.jpg", nome: "Atrta", text: "Dr. Luíz Braga" },
            { image: "https://i.pinimg.com/originals/5a/72/e1/5a72e1f05f9e2e1b76a8438a7490dc3b.jpg", nome: "Tetse-2", text: "Dr. Muito doido" },
            { image: "https://vocesa.abril.com.br/wp-content/uploads/2021/01/Dani-Almeida-pe%CC%81-de-pa%CC%81gina.jpg?quality=70&strip=info", nome: "Luiz", text: "Dra. Patricia" },
            { image: "https://ef564920920608e03abb-7d34ef097b6ab6c586dfc84157128505.ssl.cf1.rackcdn.com/PostImagem/36734/foto-de-perfil-profissional_o1eh30s23krp31qn41l3havc2fti.JPG", nome: "Darla costa", text: "Dr. Marcus filho" },
      ]

      const lembretes: Object[] = [
            {codigo: 1, descricao:'Fazer o cancelamento do paciente luan', status:'C'},
            {codigo: 2, descricao:'Falar com Dr. Marcus sobre as consultas', status:'C'},
            {codigo: 3, descricao:'test-1', status:'C'},
            {codigo: 4, descricao:'test-1', status:'P'},
            {codigo: 5, descricao:'test-1', status:'P'},
            {codigo: 6, descricao:'test-1', status:'P'},
      ];

      const renderCell = (element: any) => {
            if (element.value === "C") {
              return <div className='rounded-full h-6 text-center p-1' style={{ backgroundColor: colors.success }}><span className='font-bold text-white'>Concluico</span></div>
            }
            else if (element.value === "P") {
              return <div className='rounded-full  h-6 text-center p-1' style={{ backgroundColor: colors.secondary }}><span className='font-bold text-white'>Pendente</span></div>
            }
            else if (element.columnIndex === 3) {
              
              return <div className="flex justify-center">
                  <FaPen className="mr-2 text-sm cursor-pointer" title='Editar lembrete' style={{color: colors.primary}}/>
                  <FaTrash className="mr-2 text-sm cursor-pointer" title='Apagar lembrete' style={{color: colors.error}}/>
                  <FaClipboardCheck className="text-sm cursor-pointer" title='Concluir lembrete'style={{color: colors.warning}}/>
              </div>
            }
      }      

      const cardLembrete = (
            <div className="p-2" style={{ height: "calc(100% - 30px)" }}>
                  <p className="font-bold lg:text-xl" style={{ fontFamily: 'dosis' }}>Quadro de aviso/lembrete {UtilsGeral.getEmogi()[2]}</p>
                  <DataGridDefault dataSource={lembretes} hoverStateEnabled showColumnLines rowAlternationEnabled>
                        <Column dataField='codigo' caption='Código' alignment='center' dataType='string' width={100} cssClass='font-bold column-1' sortOrder={'desc'} />
                        <Column dataField='descricao' caption='Descrição' alignment='' dataType='string' cssClass='font-bold' />
                        <Column dataField='status' caption='Status' alignment='center' dataType='string' width={100} cssClass='font-bold' cellRender={renderCell} />
                        <Column dataField='' caption='' alignment='center' dataType='string' width={80} cssClass='font-bold' cellRender={renderCell}/>

                  </DataGridDefault>

            </div>
      );

      return <Container>
            <div className="p-3" style={{ backgroundColor: (title === 'dark' ? colors.tertiary : colors.white), borderRadius: '8px' }}>
                  <div className="w-full ali grid justify-items-end lg:flex lg:justify-end mb-5" >

                  </div>

                  <div className="w-full grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-2 mb-5" >
                        <GridCustom options={options} title="Quadro de médicos" tipo="M" />
                        <div className="">
                              <SummaryCustom id="1" className="mb-2 h-2/4 p-2">
                                    <label className="font-bold" htmlFor="" style={{ fontFamily: 'Dosis' }}>Pacientes atendidos</label>
                                    <div className="w-full text-center">
                                          <CountUp className="font-bold lg:text-9xl" end={30} prefix='' separator="." decimal="" decimals={0} style={{ color: colors.secondary, fontFamily: 'Dosis' }} />
                                    </div>
                              </SummaryCustom>
                              <SummaryCustom id="1" className="h-2/4 p-2">
                                    <label className="font-bold" htmlFor="" style={{ fontFamily: 'Dosis' }}>Pacientes atendidos</label>
                                    <div className="w-full text-center">
                                          <CountUp className="font-bold lg:text-9xl" end={30} prefix='' separator="." decimal="" decimals={0} style={{ color: colors.tertiary, fontFamily: 'Dosis' }} />
                                    </div>
                              </SummaryCustom>
                        </div>
                        <CalendarDefault/>
                  </div>

                  <div className="w-full grid grid-cols-1 gap-2 h-max lg:grid-cols-3 gap-2 lg:h-max h-96 mb-5">
                        <SummaryCustom className='mb-2 lg:mb-0 h-100 lg:col-start-1 lg:col-span-2 ' id="total-dinheiro" children={cardLembrete} colorBorder={colors.primary} />
                        <GridCustom options={options2} title="Agendamentos do dia" tipo="P" />
                  </div>
            </div>
      </Container>;
}
export default Dashboard;