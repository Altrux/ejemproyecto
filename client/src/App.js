import './App.css';
import 'primereact/resources/themes/arya-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '/node_modules/primeflex/primeflex.css'
import Menu from './components/Menu';
import Registro from './components/Registro';
import Consulta from './components/Consulta';

function App() {
  return (
    <div className="App">
      <Menu/>
      <Registro/>
      {/*<Consulta/>*/}
    </div>
  );
}

export default App;
