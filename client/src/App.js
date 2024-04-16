import './App.css';
import {useState} from "react";
import Axios from "axios";
import React, { useEffect } from 'react';
import 'primereact/resources/themes/saga-green/theme.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';    
function App() {
    const columns = [
        { field: 'id', header: 'ID' },
        { field: 'nombre', header: 'NOMBRE' },
        { field: 'edad', header: 'EDAD' },
        { field: 'pais', header: 'PAIS' },
        { field: 'cargo', header: 'CARGO' },
        { field: 'anios', header: 'AÑOS' }
    ];
  useEffect(() => {
    // Llama a la función getEmpleados() aquí
    getEmpleados();
  }, [])

  const [nombre,setNombre] = useState("");
  const [edad,setEdad] = useState(0);
  const [pais,setPais] = useState("");
  const [cargo,setCargo] = useState("");
  const [anios,setAnios] = useState(0);
  const [id,setId] = useState(0);
  const [editar,setEditar] = useState(false);
  const [empleadosList,setEmpleados] = useState([]);

  const add = ()=>{
    Axios.post("http://localhost:3001/create",{
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then(()=>{
      getEmpleados();
      limpiarCampos();
    });
  }

  const update = (rowData)=>{
    Axios.put("http://localhost:3001/update",rowData).then(()=>{

    });
  }

  const deleteEmple = (id)=>{
    Axios.delete(`http://localhost:3001/delete/${id}`).then(()=>{
      getEmpleados();
      limpiarCampos();
    });
  }

  const editarEmpleado = (val)=>{
    setEditar(true);
    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
    setId(val.id);
  };

  const getEmpleados = ()=>{
    Axios.get("http://localhost:3001/empleados").then((response)=>{
      setEmpleados(response.data);  
    });
  }

  const limpiarCampos = () =>{
    setNombre("");
    setEdad(0);
    setPais("");
    setCargo("");
    setAnios(0);
    setEditar(false);
  }
  //Saber si un valor es positivo
  const isPositiveInteger = (val) => {
    let str = String(val);

    str = str.trim();

    if (!str) {
        return false;
    }

    str = str.replace(/^0+/, '') || '0';
    let n = Math.floor(Number(str));

    return n !== Infinity && String(n) === str && n >= 0;
};
//COMPLETAR MODIFICACION
const onCellEditComplete = (e) => {
    let { rowData, newValue, field, originalEvent: event } = e;

    switch (field) {
        case 'quantity':
        case 'price':
            if (isPositiveInteger(newValue)) rowData[field] = newValue;
            else event.preventDefault();
            break;

        default:
            if (newValue.trim().length > 0){ 
              rowData[field] = newValue; /*setId(rowData.id); setNombre(rowData.nombre); setEdad(rowData.edad); setPais(rowData.pais); setCargo(rowData.cargo); setAnios(rowData.anios);*/ update(rowData);
            }
            else event.preventDefault();
            break;
    }
};
//ACTIVAR EDICION DE CELDA
const cellEditor = (options) => {
    //MANDAR AL EDITOR DE PRECIO EN ESPECIFICO
    if (options.field === 'price') return priceEditor(options);
    //MANDAR AL EDITOR DE TEXTO NORMAL
    else return textEditor(options);
};
//EDITAR TEXTO
const textEditor = (options) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} onKeyDown={(e) => e.stopPropagation()} />;
};
// EDITOR DE PRECIO (NO RELEVANTE)
const priceEditor = (options) => {
    return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} mode="currency" currency="USD" locale="en-US" onKeyDown={(e) => e.stopPropagation()} />;
};
//FORMATO PARA EL DINERO (NO RELEVANTE)
const priceBodyTemplate = (rowData) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rowData.price);
};
  return ( <div>


        <DataTable value={empleadosList} editMode="cell" tableStyle={{ minWidth: '50rem' }}>
        {columns.map(({ field, header }) => {
            return <Column key={field} field={field} header={header} style={{ width: '25%' }} body={field === 'price' && priceBodyTemplate} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} />;
        })}
        </DataTable>
   
  </div>
    /*<div className="container"><script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
      <div className="card text-center">
        <div className="card-header">
          Gestion de empleados
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input type="text" value={nombre}
              onChange={(event)=>{
                setNombre(event.target.value);
              }}                
            className="form-control" placeholder="Ingrese su nombre" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad:</span>
            <input type="number" value={edad}
              onChange={(event)=>{
                setEdad(event.target.value);
              }}                
            className="form-control" placeholder="Ingrese su edad" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Pais:</span>
            <input type="text" value={pais}
              onChange={(event)=>{
                setPais(event.target.value);
              }}                
            className="form-control" placeholder="Ingrese su pais" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo:</span>
            <input type="text" value={cargo}
              onChange={(event)=>{
                setCargo(event.target.value);
              }}                
            className="form-control" placeholder="Ingrese su cargo" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años de experiencia:</span>
            <input type="number" value={anios}
              onChange={(event)=>{
                setAnios(event.target.value);
              }}                
            className="form-control" placeholder="Ingrese sus años" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

        </div>
        <div className="card-footer text-body-secondary">
          {
            editar?
            <div>
            <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
            <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
            </div>
            :<button className='btn btn-success' onClick={add}>Registrar</button>
          }
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Años de experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            empleadosList.map((val,key)=>{
              return <tr key={val.id}>
              <th scope="row">{val.id}</th>
              <td>{val.nombre}</td>
              <td>{val.edad}</td>
              <td>{val.pais}</td>
              <td>{val.cargo}</td>
              <td>{val.anios}</td>
              <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button"
                  onClick={()=>{
                    editarEmpleado(val);
                  }}
                  className="btn btn-info">Editar</button>
                  <button type="button" onClick={()=>{
                    deleteEmple(val.id);
                  }} className="btn btn-danger">Eliminar</button>
                </div>                
              </td>
              </tr>              
            })
          }          
        </tbody>
      </table>      
    </div>*/
  );
}

export default App;
