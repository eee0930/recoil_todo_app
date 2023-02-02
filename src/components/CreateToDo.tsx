import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {categoryState, toDoState} from "../atoms";

const InputCover = styled.div`
    padding: 10px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    width: 300px;
    display: flex;
`;
const InputToDo = styled.input`
    background-color: transparent;
    border: none;
    border-bottom: solid 1px transparent;
    border-radius: 0;
    transition: border 0.4s ease;
    color: #fff;
    width: 210px;
    &:focus {
        border-bottom: solid 1px #fff;
        outline: none;
    }
`;
const Button = styled.button`
    border: none;
    background-color: #c95656;
    color: #fff;
    border-radius: 8px;
    width: 75px;
    height: 30px;
    margin-left: 10px;
    cursor: pointer;
`;
interface IForm {
    toDo: string;
}


function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);
    const {register, handleSubmit, setValue} = useForm<IForm>();
    const handleValid = ({toDo}: IForm) => {
        const newTodo = {
            id: Date.now(),
            text: toDo,
            category,
        }
        setToDos((oldToDos) => {
            const newTodos = [newTodo, ...oldToDos];
            return newTodos;
        });
        setValue("toDo", "");
    }
    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <InputCover>
                <InputToDo {...register("toDo", {
                    required: "Please write a To do",
                    })} placeholder="Write a to do" />
                <Button >Add</Button>
            </InputCover>
        </form>
    );
}

export default CreateToDo;