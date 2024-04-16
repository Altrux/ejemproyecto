import React from 'react'
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { useState } from "react";
import { useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Axios from "axios";

const Consulta = () => {
    const columns = [
        { field: 'id', header: 'ID' },
        { field: 'nombre', header: 'NOMBRE' },
        { field: 'edad', header: 'EDAD' },
        { field: 'pais', header: 'PAIS' },
        { field: 'cargo', header: 'CARGO' },
        { field: 'anios', header: 'AÑOS' }
    ];

    const [nombre,setNombre] = useState("");
    const [edad,setEdad] = useState(0);
    const [pais,setPais] = useState("");
    const [cargo,setCargo] = useState("");
    const [anios,setAnios] = useState(0);
    const [id,setId] = useState(0);
    const [editar,setEditar] = useState(false);
    const [empleadosList,setEmpleados] = useState([]);    

    useEffect(() => {
        // Llama a la función getEmpleados() aquí
        getEmpleados();
    }, []);

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
    
      /*const editarEmpleado = (val)=>{
        setEditar(true);
        setNombre(val.nombre);
        setEdad(val.edad);
        setPais(val.pais);
        setCargo(val.cargo);
        setAnios(val.anios);
        setId(val.id);
      };*/
      
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
           
  return (
    <>
        <DataTable value={empleadosList} editMode="cell" tableStyle={{ minWidth: '50rem' }}>
        {columns.map(({ field, header }) => {
            return <Column key={field} field={field} header={header} style={{ width: '25%' }} body={field === 'price' && priceBodyTemplate} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} />;
        })}
        </DataTable>      
    </>
  )
}

export default Consulta