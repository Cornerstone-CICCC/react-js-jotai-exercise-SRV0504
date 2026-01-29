// src/atoms/user.atom.ts
import { atom } from "jotai";

export const firstNameAtom = atom<string>("John");
export const lastNameAtom = atom<string>("Doe");
export const ageAtom = atom<number>(25);
export const hobbiesAtom = atom<string[]>(["Music"]);
