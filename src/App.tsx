
import 'assets/styles/App.scss';
import AuthLayout from 'components/authLayout';
import PainelLayout from 'components/painelLayout';
import Login from 'pages/auth/login';
import HasPermissao from 'pages/painel';
import Animes from 'pages/painel/animes';
import AddAnime from 'pages/painel/animes/add';
import { Navigate, Route, Routes } from 'react-router-dom';


const App = () => {

  return (
    <Routes>
      <Route path="/" element={<>Home</>} />      
      <Route path="/login" element={<Navigate to={'/auth/login'} />} />      
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Navigate to={'/auth/login'} />} />
        <Route path="login" element={<Login />} />
        {/* <Route path="logout" element={<Logout />} />         */}
        <Route path="*" element={<Navigate to={'login'} />} />
      </Route>
      <Route path="/painel" element={<PainelLayout />}>
        <Route index element={<Navigate to={'/painel/animes'} />} />
        <Route path="animes" element={<HasPermissao role={['ROLE_ADMIN']} />} >
          <Route index element={<Animes />} />
          <Route path="add" element={<AddAnime />} />
        </Route>
        {/* <Route path="selecionar-data" element={<HasPermissao role={['ROLE_OPERATOR']} />} >
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
        <Route path="*" element={<Erro404 />} /> */}
      </Route>     
    </Routes>
  );
}

export default App;
