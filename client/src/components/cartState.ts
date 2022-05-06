import { atom } from 'jotai';

export interface product {
  id: number;
  title: string;
  price: number;
  count: number;
}

const cartAtom = atom<product[]>([]);

export default cartAtom;
