// authGuard.js
import axiosClient from './axiosClient';
import { redirect } from 'react-router-dom';

export async function checkAdminAccess() {
  try {
    const { data } = await axiosClient.get('/user');
    if (data.email === 'admin@gmail.com') {
      return null; // Access granted
    } else {
      return redirect('/rates'); // Redirect if not admin
    }
  } catch (error) {
    return redirect('/login'); // Redirect if not logged in or error
  }
}
