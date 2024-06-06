import axios from 'axios';

const apiService = {
  login: async (email, password) => {
    return axios.post('/api/auth/login', { email, password });
  },
  logout: () => axios.post("/api/auth/logout"),
  // Diğer API çağrıları burada tanımlanabilir
};

export default apiService;
