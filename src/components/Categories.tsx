import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { allCategoriesState, IToDo, toDoState } from "../atoms";

const CategoryList = styled.ul`
    list-style: none;
    max-width: 300px;
    margin-top: 15px;
    li {
        margin-right: 5px;
        margin-bottom: 5px;
        display: inline-block;
    }
`;

const CategoryEle = styled.span`
    color: #e8eaf7;
    padding: 5px 10px;
    font-size: 10px;
    background-color: rgba(201, 86, 86, 0.2);
    border-radius: 5px;
`;

const Delete = styled.button`
    border: none;
    cursor: pointer;
    font-size: 14px;
    width: 25px;
    height: 22px;
    border-radius: 5px;
    color: #dd5f5f;
    background-color: transparent;
    font-size: 15px;
`;

function Categories() {
    const [categories, setCategories] = useRecoilState(allCategoriesState);
    const setToDos = useSetRecoilState(toDoState);
    const handleDelete = (cate:string) => {
        const deleteCate = cate;
        setToDos((prevToDos:IToDo[]) => {
            const newToDos = [...prevToDos].filter((todo) => todo.category !== deleteCate);
            return newToDos;
        });
        setCategories((prevCategories:string[]) => {
            const newCategories = [...prevCategories].filter((category) => category !== deleteCate);
            return newCategories;
        });
    }

    return (<CategoryList>
        {categories?.map((cate:string) =>
        <li key={cate}>
            <CategoryEle>{cate}</CategoryEle>
            {categories.length > 1 ? <Delete onClick={() => handleDelete(cate)}>&times;</Delete> : null}
        </li>)}
    </CategoryList>);
}

export default Categories;