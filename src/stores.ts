// stores.ts
import { writable } from 'svelte/store';
import type User from './lib/User';


const storedUser = localStorage.getItem('currentUser');
const initialUser: User | null = storedUser ? JSON.parse(storedUser) : null;

export const currentUser = writable<User | null>(initialUser);

currentUser.subscribe(($currentUser) => {
  // Save to localStorage on every change
  localStorage.setItem('currentUser', JSON.stringify($currentUser));
});
