
import { FaBookReader, FaCartArrowDown, FaFileInvoiceDollar, FaRegSun, FaShopify, FaSpeakap, FaStoreAlt, FaTh, FaUserFriends, FaUserInjured, FaUserMd } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Cargo } from '../../domain/enums';
import { reset } from '../../store/slices/menuUser.slice';
import { selectStateUser } from '../../store/slices/usuario.slice';
import { Container, MenuContainer } from './styles';

export function Aside() {
  const dispatch = useDispatch();
  const userAplication = useSelector(selectStateUser);

  return <Container onClick={() => { dispatch(reset()) }}>
    <MenuContainer>
      {userAplication.cargo === Cargo.CAIXA || userAplication.cargo === Cargo.ADMIN || userAplication.cargo === Cargo.MASTER
        || userAplication.cargo === Cargo.GERENTE ?
        <Link to={'/financeiro'}>
          <div className='w-100 text-center mb-2'>
            <FaTh className='btn-menu' />
            <label className='text-white font-bold' style={{ fontSize: '10px', marginRight:'10px' }}>DASHBOARD</label>
          </div>
        </Link>
        : ""
      }
      {userAplication.cargo === Cargo.ESTOQUISTA || userAplication.cargo === Cargo.ADMIN || userAplication.cargo === Cargo.MASTER
        || userAplication.cargo === Cargo.GERENTE ?
        <Link to={'/agendamento'}>
          <div className='w-100 text-center mb-2'>
            <FaBookReader className='btn-menu' />
            <label className='text-white font-bold' style={{ fontSize: '11px' }}>AGENDA</label>
          </div>
        </Link>
        : ""
      }
      {userAplication.cargo === Cargo.ADMIN || userAplication.cargo === Cargo.MASTER
        || userAplication.cargo === Cargo.GERENTE ?
        <Link to={'/gerencia-paciente'}>
          <div className='w-100 text-center mb-2'>
            <FaUserInjured className='btn-menu' />
            <label className='text-white font-bold' style={{ fontSize: '10px' }}>PACIENTE</label>
          </div>
        </Link>
        : ""
      }
      {userAplication.cargo === Cargo.ESTOQUISTA || userAplication.cargo === Cargo.ADMIN || userAplication.cargo === Cargo.MASTER
        || userAplication.cargo === Cargo.GERENTE ?
        <Link to={'/gerencia-medico'}>
          <div className='w-100 text-center mb-2'>
            <FaUserMd className='btn-menu' />
            <label className='text-white font-bold' style={{ fontSize: '11px' }}>MÉDICO</label>
          </div>
        </Link>
        : ''
      }
      {userAplication.cargo === Cargo.ADMIN || userAplication.cargo === Cargo.MASTER ?
        <Link to={'/estabelecimento'}>
          <div className='w-100 text-center mb-2'>
            <FaStoreAlt className='btn-menu' />
            <label className='text-white font-bold' style={{ fontSize: '11px' }}>EMPRESA</label>
          </div>
        </Link>
        : ""
      }
      {userAplication.cargo === Cargo.ADMIN || userAplication.cargo === Cargo.MASTER
        || userAplication.cargo === Cargo.GERENTE ?
        <Link to={'/usuario'}>
          <div className='w-100 text-center mb-2'>
            <FaUserFriends className='btn-menu' />
            <label className='text-white font-bold' style={{ fontSize: '11px' }}>USUÁRIOS</label>
          </div>
        </Link>
        : ""
      }
      { userAplication.cargo === Cargo.MASTER ?
        <Link to={'/configurar'}>
          <div className='w-100 text-center'>
            <FaRegSun className='btn-menu' />
            <label className='text-white font-bold' style={{ fontSize: '9.5px' }}>CONFIGURAR</label>
          </div>
        </Link>
        : ""
      }
    </MenuContainer>
  </Container>;
}