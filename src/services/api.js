import axios from 'axios';

const $publicHost = axios.create({
  baseURL: "https://connections-api.herokuapp.com",
  headers: {
    'Content-Type': 'application/json',
  },
});

const $privateHost = axios.create({
  baseURL: "https://connections-api.herokuapp.com",
  headers: {
    'Content-Type': 'application/json',
  },
});

// Це middleware, який перед кожним запитом в поле Authorization
// в хедерах буде підчіпляти токен користувача з локального хранилища
const authInterceptor = config => {
  config.headers['Authorization'] = localStorage.getItem('token');
  return config;
};

$privateHost.interceptors.request.use(authInterceptor);

/*
{
  baseURL: "https://connections-api.herokuapp.com",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token...,
  },
}
*/

export const UserAPI = {
  async register(formData) {
    const { data } = await $publicHost.post(`users/signup`, formData);
    return data;
  },
  async login(formData) {
    const { data } = await $publicHost.post(`users/login`, formData);
    return data;
  },
  async getUserDetailsRequest() {
    const { data } = await $privateHost.get(`/users/current`);
    return data;
  },
  async userLogOutRequest() {
    const { data } = await $privateHost.post(`/users/logout`);
    return data;
  },
};

export const ContactsAPI = {
  async getContacts() {
    const { data } = await $privateHost.get(`/contacts`);
    return data;
  },
  async addContact(contactData) {
    const { data } = await $privateHost.post(`/contacts`, contactData);
    return data;
  },
  async deleteContact(contactId) {
    const { data } = await $privateHost.delete(`/contacts/${contactId}`);
    return data;
  },
};