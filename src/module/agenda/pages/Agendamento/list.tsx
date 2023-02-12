import { Column } from 'devextreme-react/data-grid';
import React, { useContext } from 'react';
import { FaClipboardCheck, FaCube, FaPen, FaSave, FaTrash } from 'react-icons/fa';
import { ThemeContext } from 'styled-components';
import { ButtonIcon, DataGridDefault, Divider, ModalDefault } from '../../../../components';

// import { Container } from './styles';
interface ListaProps {
    options: Array<any>;
    showModal: boolean;
    closeModal: () => void;
}

const Lista: React.FC<ListaProps> = (props) => {
    const { colors, title } = useContext(ThemeContext);

    const array = [
        { cpf: '406.555.555-89', paciente: 'Luan Miranda', medico: 'Dr. Marcus filho', agendado: '2022-02-15', valor: 150.52, status: 'C' },
        { cpf: '406.555.555-89', paciente: 'Luan Miranda', medico: 'Dr. Marcus filho', agendado: '2022-02-15', valor: 150.52, status: 'C' },
        { cpf: '406.555.555-89', paciente: 'Luan Miranda', medico: 'Dr. Marcus filho', agendado: '2022-02-15', valor: 150.52, status: 'A' },
        { cpf: '406.555.555-89', paciente: 'Luan Miranda', medico: 'Dr. Marcus filho', agendado: '2022-02-15', valor: 150.52, status: 'P' },
        { cpf: '406.555.555-89', paciente: 'Luan Miranda', medico: 'Dr. Marcus filho', agendado: '2022-02-15', valor: 150.52, status: 'C' },
    ]

    const renderCell = (element: any) => {
        if (element.value === "C") {
            return <div className='rounded-full h-6 text-center p-1' style={{ backgroundColor: colors.success }}><span className='font-bold text-white'>Concluico</span></div>
        }
        else if (element.value === "P") {
            return <div className='rounded-full  h-6 text-center p-1' style={{ backgroundColor: colors.secondary }}><span className='font-bold text-white'>Pendente</span></div>
        }
        else if (element.value === "A") {
            return <div className='rounded-full  h-6 text-center p-1' style={{ backgroundColor: colors.primary }}><span className='font-bold text-white'>Pendente</span></div>
        }
        else if (element.columnIndex === 6) {

            return <div className="flex justify-center">
                <FaPen className="mr-2 text-sm cursor-pointer" title='Editar lembrete' style={{ color: colors.primary }} />
                <FaTrash className="mr-2 text-sm cursor-pointer" title='Apagar lembrete' style={{ color: colors.error }} />
                <FaClipboardCheck className="text-sm cursor-pointer" title='Concluir lembrete' style={{ color: colors.warning }} />
            </div>
        }
    }

    const headertable = <div className='w-2/12 text-right'>
        <ButtonIcon className="" label="Filtros avançados" icon={<FaSave />} width={'200px'} />
    </div>


    return <ModalDefault
        isOpen={props.showModal}
        title=''
        onRequestClose={props.closeModal}
        width='96%'
        margin='1%'
        height='96%'
        left='2%'
    >

        <header className='mb-10'>
            <div className="flex items-center justify-between text-2xl font-bold" style={{ color: (title === 'dark' ? colors.white : colors.primary), fontFamily: 'Dosis' }}>
                <div className="flex items-center">
                    <FaCube className="mr-2" />
                    <label htmlFor="">Agendamentos</label>
                </div>
            </div>
            <Divider tipo="horizontal" />
        </header>

        <div className='card-local-2 p-2' style={{ height: "calc(100vh - 230px)" }}>
            <DataGridDefault dataSource={array} hoverStateEnabled showColumnLines rowAlternationEnabled isSearch isHeader headerChildren={headertable} cssSearch='w-10/12'>
                <Column dataField='cpf' caption='CPF' alignment='center' dataType='string' width={100} cssClass='font-bold column-1' />
                <Column dataField='paciente' caption='Paciente' alignment='' dataType='string' cssClass='font-bold' />
                <Column dataField='medico' caption='Medico' dataType='string' cssClass='font-bold' />
                <Column dataField='agendado' caption='Agendado' alignment='' dataType='date' sortOrder={'desc'} />
                <Column dataField='valor' caption='Valor' alignment='center' dataType='number' width={100} format={{ type: 'fixedPoint', precision: 2 }} />
                <Column dataField='status' caption='Status' alignment='center' dataType='string' width={100} cssClass='font-bold' cellRender={renderCell} />
                {/* <Column dataField='' caption='' alignment='center' dataType='string' width={80} cssClass='font-bold' cellRender={renderCell} /> */}
            </DataGridDefault>
        </div>
    </ModalDefault>
}

export default Lista;