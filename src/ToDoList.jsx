import React, { useState, useEffect } from "react";
import './ToDoList.css';
import Icone from './img/checklist.png';
function ToDoList(form){

    const listaStorage = localStorage.getItem('lista');

    var [lista, setlista] = useState(listaStorage ? JSON.parse(listaStorage): []);
    var [novoItem, setNovoItem] = useState("");

    useEffect(()=>{
        localStorage.setItem('lista', JSON.stringify(lista));
    },[lista])

    function adicionaItem(e) {
        e.preventDefault();
        if (!novoItem) {
            return;
        }
        setlista([...lista, { text: novoItem, isCompleted: false }]);
        setNovoItem(""); 
        document.getElementById('input-entrada').focus();
    }

    function clicou(index){
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setlista(listaAux);
    }

    function deleteItem(index){
        const listaAux = [...lista];
        listaAux.splice(index,1);
        setlista(listaAux);
    }

    function deleteAll(){
        setlista([]);

    }
    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <form onSubmit={(e) => adicionaItem(e)}>
                <input 
                id = "input-entrada"
                type="text"
                value={novoItem}
                onChange={(e)=>{setNovoItem(e.target.value)}}
                placeholder="Adcione uma tarefa"
                />
                <button className="add" type="submit">Add</button>
            </form>
            <div className="ListaTarefas">
             <div style={{textAlign: 'center'}}>
                    {
                        lista.length < 1
                            ?
                            <img className="icone-central" src={Icone} />
                            :
                            lista.map((item, index) => (
                                <div 
                                key={index}
                                className={item.isCompleted ? "item completo" : "item"}>
                                
                                <span onClick={()=>{clicou(index)}}>{item.text}</span>
                                <button onClick={()=>{deleteItem(index)}}className="del">Deletar</button>
                            </div>
                            ))

                    } 
                    {
                        lista.length > 0 &&
                        <button onClick={()=>{deleteAll()}} className="deleteAll">Deletar Todas</button>
                    }
            
                </div>
            </div>
        </div>
    )
}

export default ToDoList