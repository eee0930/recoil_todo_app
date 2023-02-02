import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { allCategoriesState, IToDo, toDoState } from "../atoms";

const ToDoEle = styled.li`
    margin-top: 5px;
    max-width: 300px;
`;

const ButtonSt = styled.button`
    border: none;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
`;

const SelCategory = styled(ButtonSt)`
    color: #e8eaf7;
    font-size: 10px;
    margin-right: 3px;
    background-color: rgba(201, 86, 86, 0.2);
    &:hover {
        color: #a1a7ce;
    }
    &:nth-child(2) {
        margin-left: 20px;
    }
`;

const Delete = styled(ButtonSt)`
    color: #dd5f5f;
    background-color: transparent;
    font-size: 15px;
`;

function ToDo({text, category, id}: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const categories = useRecoilValue(allCategoriesState);
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
            const newToDo = {text, id, category: name as string};
            const newTodos = [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex+1)];
            return newTodos;
        });
    };
    const deleteToDo = () => {
        setToDos((oldToDos) => {
            const newTodos = [...oldToDos].filter((todo) => todo.id !== id);
            return newTodos;
        });
    };
    return <ToDoEle>
        <span>{text}</span>
        {categories.filter((cate: string) => cate !== category).map((category: string) => (
            <SelCategory name={category} key={category} onClick={onClick}>
                {category}
            </SelCategory>
        ))}
        <Delete onClick={deleteToDo}>&times;</Delete>
    </ToDoEle>;
}

export default ToDo;