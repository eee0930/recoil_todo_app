import { atom, selector } from "recoil";
import { recoilPersist } from 'recoil-persist';

/* export enum Categories {
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE",
} */

export interface IToDo {
    text: string;
    id: number;
    category: string;
}

const { persistAtom } = recoilPersist({
    key: 'toDoStorage',
    storage: localStorage,
});
  

export const allCategoriesState = atom({
    key: 'allCategories',
    default: ['TO_DO', 'DOING', 'DONE'],
    effects_UNSTABLE: [persistAtom],
});

export const categoryState = atom({
    key: "category",
    default: 'TO_DO',
    effects_UNSTABLE: [persistAtom],
});

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((toDo) => toDo.category === category);
    },
});

