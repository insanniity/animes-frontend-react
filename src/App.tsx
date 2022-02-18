
import 'assets/styles/App.scss';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<AuthLayout />}>
        <Route index element={<Navigate to={'login'} />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="esqueci-a-senha" element={<EsqueciSenha />} />
        <Route path="trocar-senha">
          <Route index element={<Navigate to="/login" replace />} />
          <Route path=":token" element={<TrocarSenha />} />
        </Route>
        <Route path="*" element={<Navigate to={'login'} />} />
      </Route>
      <Route path="/painel" element={<PainelLayout />}>
        <Route index element={hasAnyRoles(["ROLE_ADMIN"]) ? <Navigate to={'/painel/agendamentos'} /> : <Navigate to={'/painel/listar-pedidos'} /> } />
        <Route path="listar-pedidos" element={<HasPermissao role={['ROLE_OPERATOR']} />} >
          <Route index element={<Pedidos />} />
        </Route>
        <Route path="selecionar-data" element={<HasPermissao role={['ROLE_OPERATOR']} />} >
          <Route index element={<SelectData />} />
        </Route>
        <Route path="agendamento-enviado" element={<HasPermissao role={['ROLE_OPERATOR']} />} >
          <Route index element={<Agradecimento />} />
        </Route>
        <Route path="agendamentos" element={<HasPermissao role={['ROLE_ADMIN','ROLE_OPERATOR']} />} >
          <Route index element={<Agendamentos />} />
        </Route>
        <Route path="configuracoes" element={<HasPermissao role={['ROLE_ADMIN']} />} >
          <Route index element={<Configuracoes />} />
        </Route>
        <Route path="excecoes-data" element={<HasPermissao role={['ROLE_ADMIN']} />} >
          <Route index element={<DataExceptions />} />
        </Route>
        <Route path="*" element={<Erro404 />} />
      </Route> */}
    </Routes>
  );
}

export default App;
