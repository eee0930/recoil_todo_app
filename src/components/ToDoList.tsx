import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { allCategoriesState, categoryState, toDoSelector } from "../atoms";
import Categories from "./Categories";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;d
`;
const Title = styled.h1` 
    padding: 15px 0;
    margin: 15px 0;
    border-bottom: 1px solid #ccc;
    text-align: left;
    width: 300px;
`;
const ToDoListCover = styled.div`
    margin-bottom: 30px;
`;
const Select = styled.select`
    border-radius: 10px;
    width: 150px;
    height: 35px;
    border: solid 1px #ccc;
    background-color: #fff;
    padding: 0 5px;
    margin-bottom: 15px;
`;

const Ul = styled.ul`
    margin-top: 15px;
    list-style: none;
`;

function ToDoList() {
    const toDos = useRecoilValue(toDoSelector);
    
    const setCategory = useSetRecoilState(categoryState);
    const categories = useRecoilValue(allCategoriesState);
    const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as string);
    }
    return  (
    <Container>
        <Title>To Dos</Title>
        <ToDoListCover>
            <Select defaultValue='' onInput={onInput}>
                {categories?.map((cate: string) => (
                    <option key={cate} value={cate}>{cate}</option>
                ))}
            </Select>
            
            <CreateToDo />
            <Ul>
                {toDos?.map((toDo) => (
                    <ToDo key={toDo.id} {...toDo} />))
                }
            </Ul>
        </ToDoListCover>
        <Title>Create Categories</Title>
        <ToDoListCover>
          <CreateCategory />
          <Categories />
        </ToDoListCover>
    </Container>);
}

export default ToDoList;
