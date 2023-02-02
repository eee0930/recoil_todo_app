import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { allCategoriesState } from "../atoms";



const InputCover = styled.div`
    padding: 10px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    width: 300px;
    display: flex;
`;
const InputCategory = styled.input`
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

interface ICategory {
    cate: string;
}

function CreateCategory() {
    const { register, handleSubmit, setValue } = useForm<ICategory>();
    const [categories, setCategories] = useRecoilState(allCategoriesState);

    const handleValid = ({ cate }: ICategory) => {
        if(!cate) {
            return;
        } else if(categories.includes(cate) > 0) {
            alert("이미 존재하는 카테고리입니다.");
            setValue("cate", "");
            return;
        }
        const category = cate;
        setCategories((prev: any) => {
            const newCategories = [...prev, category];
            return newCategories;
        });
        
        setValue("cate", "");
    };

   
    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <InputCover>
                <InputCategory {...register("cate", {
                        required: "Please enter a category",
                    })}
                    placeholder="Write a category"/>
                <Button>Add</Button>
            </InputCover>
        </form>
    );
}

export default CreateCategory;