import React, { Suspense } from "react";
import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
//nossos imports
import Agendamento from '../module/agenda/pages/Agendamento';
import Configuracao from '../module/config/pages/Configuracao';
import Usuario from '../module/authenticate/pages/Usuario';
import Estabelecimento from '../module/estabelecimento/pages/Estabelecimento';
import Estabelecimentos from '../module/estabelecimento/pages/Estabelecimento/lista';
import { Layout } from "../components/Layout";
import Dashboard from "../module/financeiro/pages/Dashboard";
import { Notfound } from "../module/Notfound";
import { EmConstrucao } from "../module/telaConstrucao";

interface Props {
  setDefaultTheme(): void;
}

const AppRoutes: React.FC<Props> = ({ setDefaultTheme }) => {
  return (
      <Layout alterTheme={setDefaultTheme}>
        <Suspense
          fallback={<div className="">Carregando....</div>}
        >
          <Routes>
            <Route path="/" />
            {/* nossas rotas */}
            <Route path="/agendamento" element={<Agendamento/> } />
            <Route path="/configurar" element={<Configuracao />} />
            <Route path="/usuario" element={<Usuario />} />
            <Route path="/estabelecimento" element={<Estabelecimento showModal={true} tipo={2} closeModal={()=>{}} />} />
            <Route path="/estabelecimentos" element={<Estabelecimentos />} />
            <Route path="/financeiro" element={<Dashboard />} />
            <Route path="*" element={<Notfound />} />
            <Route path="/contas" element={<EmConstrucao />} />
            <Route path="/plano-contas" element={<EmConstrucao />} />
            <Route path="/dre" element={<EmConstrucao />} />
            <Route path="/curva-abc" element={<EmConstrucao />} />
            <Route path="/estoque-critico" element={<EmConstrucao />} />
            <Route path="/sped" element={<EmConstrucao />} />
          </Routes>
        </Suspense>
      </Layout>
  );
};
export default AppRoutes;
