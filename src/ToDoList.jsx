import React, { useState, useEffect } from "react";
import './ToDoListLight.css';
import IconeDark from './img/checkDark.gif';
import IconeLight from './img/checkLight.gif';

// Define the CSS file paths
const ToDoListCss = "./src/ToDoList.css";
const ToDoListLightCss = "./src/ToDoListLight.css";

function ToDoList(form) {
    const listaStorage = localStorage.getItem('lista');
    const [lista, setlista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoItem] = useState("");
    const [isLightMode, setIsLightMode] = useState(true);

    useEffect(() => {
        localStorage.setItem('lista', JSON.stringify(lista));
    }, [lista]);

    function adicionaItem(e) {
        e.preventDefault();
        if (!novoItem) {
            return;
        }
        setlista([...lista, { text: novoItem, isCompleted: false }]);
        setNovoItem("");
        document.getElementById('input-entrada').focus();
    }

    function clicou(index) {
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setlista(listaAux);
    }

    function deleteItem(index) {
        const listaAux = [...lista];
        listaAux.splice(index, 1);
        setlista(listaAux);
    }

    function deleteAll() {
        setlista([]);
    }

    useEffect(() => {
        // Create a new style element
        const styleElement = document.createElement('style');
        // Define your light mode styles
        const lightStyles = `
        body{
            background-color: #ffffff;
        }
        button.add{
            background: #6a71a2;
            color: white;
        }
        button.add:hover{
            color:white;
            background-color: #9098ce;
            }
        input{
            color:#7d83b9;
            background: #dfdfdf;
            }
            .item:hover{
                background-color: #dfdfdf;
            }
            .item span{
                color: rgb(0, 0, 0);

            }
            .item.completo{
                background-color: #dfdfdf;
                color: black;
                opacity: 0.4;
            }
            .item.completo span{
                color: #4d506e;
                text-decoration: line-through;
            }
        `;
        // Define your dark mode styles
        const darkStyles = `
        body{
            background-color: #222435;
            font-family: 'Roboto', sans-serif;
        }
    }
    button.add{
        background: #363b65;
    }
    button.add:hover{
        color:white;
        background-color: #363f88;
    }
    input{
        color:#a2a2a4;
        background: #2d3046;
    }
    .item:hover{
        background-color: #151627;
    }
    .item span{
        color: white;
    }
    .item.completo{
        background-color: #1e1f2e;
        color: black;
        opacity: 0.8;
    }
    .item.completo span{
        color: #4d506e;
    }
        `;
        const selectedStyles = isLightMode ? darkStyles : lightStyles;
        styleElement.innerHTML = selectedStyles;
        document.head.appendChild(styleElement);
    }, [isLightMode]);

    // Function to toggle the light/dark mode
    const toggleTheme = () => {
        setIsLightMode(!isLightMode);
    };

    const iconSrc = isLightMode ? IconeDark : IconeLight;

    return (
        <div>
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
                    id="input-entrada"
                    type="text"
                    value={novoItem}
                    onChange={(e) => { setNovoItem(e.target.value) }}
                    placeholder="Adcione uma tarefa"
                />
                <button className="add" type="submit">Add</button>
            </form>
            <div className="ListaTarefas">
                <div style={{ textAlign: 'center' }}>
                    {
                        lista.length < 1
                            ?
                            <img className="icone-central" src={iconSrc} alt="Checklist Icon" />
                            :
                            lista.map((item, index) => (
                                <div
                                    key={index}
                                    className={item.isCompleted ? "item completo" : "item"}>

                                    <span onClick={() => { clicou(index) }}>{item.text}</span>
                                    <button onClick={() => { deleteItem(index) }} className="del">Deletar</button>
                                </div>
                            ))

                    }
                    {
                        lista.length > 0 &&
                        <button onClick={() => { deleteAll() }} className="deleteAll">Deletar Todas</button>
                    }

                </div>
            </div>
        </div>
    )
}

export default ToDoList;
