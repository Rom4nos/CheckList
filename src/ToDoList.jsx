import React, { useState, useEffect } from "react";
// import './ToDoList.css';
// import './ToDoListLight.css';
import IconeDark from './img/checkDark.gif';
import IconeLight from './img/checkLight.gif';
function ToDoList(form){

    const listaStorage = localStorage.getItem('lista');

    var [lista, setlista] = useState(listaStorage ? JSON.parse(listaStorage): []);
    var [novoItem, setNovoItem] = useState("");
    const [isLightMode, setIsLightMode] = useState(true);

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
 
    const toggleTheme = () => {
        setIsLightMode(!isLightMode);
    };

    const themeCssFile = isLightMode ? "/ToDoList.css" : "/ToDoListLight.css";


    const iconSrc = isLightMode ? IconeDark : IconeLight;

    return (
        <div>
        <link rel="stylesheet" type="text/css" href={themeCssFile} />

        <div className={`switchButton ${isLightMode ? "light-theme" : "dark-theme"}`}>
            <h1>Lista de Tarefas</h1>
            <label className="switch">
                <input
                    className="switchinput"
                    type="checkbox"
                    id="themeToggle"
                    onChange={toggleTheme}
                    checked={isLightMode}
                />
                <span className="slider round"></span>
            </label>
        </div>
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
                            <img className="icone-central" src={iconSrc} alt="Checklist Icon"  />
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
