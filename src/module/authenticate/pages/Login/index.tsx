import { useContext, useState } from "react";
import { FaEnvelope, FaExpeditedssl, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ThemeContext } from "styled-components";
import bannerInferior from '../../../../assets/banner_inferior.svg';
import bannerSuperior from '../../../../assets/banner_superior.svg';
import icon from '../../../../assets/Logo/icon.svg';
import { ButtonBase } from "../../../../components/Buttons/ButtonBase";
import { Logo } from '../../../../components/Logo';
import { SizeLogo } from '../../../../domain/enums';
import { UsuarioService } from "../services/usuarioService";
import { Container } from "./styles";


function Login() {
  const theme = useContext(ThemeContext);
  const [showPass, setShowPass] = useState(false);
  const [user, setUser] = useState<Object>({ email: '', password: '' });

  const service = new UsuarioService();
  const login = () => {
    service.login(user).then(response => {
      if (response.status !== "S") {
        toast.error("Seu usuario foi desativado! fale com administrador do sistema");
        return
      }
      window.location.reload();
    }).catch(error => {
      toast.error(error.mensagemUsuario);
    });
  }
  return (
    <>
      <img className="w-28 h-28" src={bannerSuperior} alt='logo' style={{ position: 'absolute', width: '100vw', top: '0', margin: '0', zIndex: '-1' }} />
      <Container >
        <div className="div-left">
          <div className="">
            <img className="w-24 h-24 absolute" src={icon} alt='logo' style={{left:'calc(100vw - 117%)', top:'calc(100vh - 90%)'}}/>
            <br />
            <p className="pt-4" style={{ color: theme.title === 'light' ? theme.colors.tertiary : theme.colors.textLabel }}><h3>Seu negócio na palma de sua mão!</h3></p>
            <div style={{ margin: "2rem" }}>
              <div className="flex mb-9">
                <FaEnvelope className="ml-2 mt-1.5" style={{ fontSize: '24px', position: 'absolute' }} />
                <input className="input_line__field" style={{ paddingLeft: '2.5rem' }} type="email"
                  placeholder="Digite o e-mail" name="email" id="email"
                  onChange={(event) => setUser({
                    ...user, email: event.target.value
                  })}
                />
              </div>
              <div className="grid grid-cols-3">
                <FaExpeditedssl className="mt-1.5 ml-2 col-start-1 col-end-3" style={{ fontSize: '24px', position: 'absolute' }} />
                <input className="input_line__field col-start-1 col-span-4" style={{ paddingLeft: '2.5rem' }} type={showPass ? "text" : "password"} placeholder="Digite o e-mail" name="email" id="email"
                  onChange={(event) => setUser({
                    ...user, password: event.target.value
                  })} />
                {showPass === true ?
                  <FaEye className="mt-2 olho col-end-7 col-span-2"
                    onClick={() => setShowPass(false)}
                  />
                  :
                  <FaEyeSlash className="mt-2 olho col-end-7 col-span-2"
                    onClick={() => setShowPass(true)}
                  />
                }
              </div>
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
              <ButtonBase label="ENTRAR" model="btn_base" className="primary-color mb-3" size="small" onClick={login} />
              <Link to={'/recupera-senha'}>
                <label htmlFor="entrar" className="font-bold label-senha"
                  style={{ color: theme.title === 'light' ? theme.colors.secondary : theme.colors.black }}>Esqueceu a senha?
                </label>
              </Link>
            </div>
          </div>
        </div>
        <div className="div-right">
          <Logo size={SizeLogo.MEDIUM}></Logo>
          <h1 className="p-3">Melhor solução  para clínica e hospitais</h1>
          <h2 className="p-2">Tudo com um toque ou um click de distância!</h2>
          <h2 className="p-2">Tenha mais tempo para sua familia</h2>
          <h2 className="p-2 mb-10">O GERENCIAMENTE da sua empresa na palma da mão</h2>
          <h2 className="p-3" style={{ color: theme.title === 'light' ? theme.colors.primary : theme.colors.textLabel }}>www.advicehealth.com/atendimento</h2>
        </div>
      </Container>
      <img className="w-28 h-28" src={bannerInferior} alt='logo' style={{ position: 'absolute', width: '100%', bottom: '0', margin: '0', zIndex: '-1' }} />
      {/* <ToastDefault /> */}
    </>
  );
}

export default Login;
