import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://sandbox.api.material.com',
  headers: {
    'Content-Type': 'application/json',
    'x-mat-tenant': '59025c61c1fee8001003addf'
  }
});
