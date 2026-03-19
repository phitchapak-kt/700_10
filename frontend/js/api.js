const BASE_URL = 'http://localhost:8000'    

const api ={
    users: {
        getAll: () => axios.get(`${BASE_URL}/users`),
        getById: (id) => axios.get(`${BASE_URL}/users/${id}`),
        create: (data)=> axios.post(`${BASE_URL}/users`,data),
        update: (id, data) => axios.put(`${BASE_URL}/users/${id}`, data),
        remove: (id) => axios.delete(`${BASE_URL}/users/${id}`)
    },
    categories: {
        getAll: () => axios.get(`${BASE_URL}/categories`),
        getById: (id) => axios.get(`${BASE_URL}/categories/${id}`),
        create: (data) => axios.post(`${BASE_URL}/categories`, data),
        update: (id, data) => axios.put(`${BASE_URL}/categories/${id}`, data),
        remove: (id) => axios.delete(`${BASE_URL}/categories/${id}`)
    },
    listings: {
        getAll: () => axios.get(`${BASE_URL}/listings`),
        getById: (id) => axios.get(`${BASE_URL}/listings/${id}`),
        create: (data)=> axios.post(`${BASE_URL}/listings`,data),
        update: (id, data) => axios.put(`${BASE_URL}/listings/${id}`, data),
        remove: (id) => axios.delete(`${BASE_URL}/listings/${id}`)
    },
    conversations: {
        getAll: () => axios.get(`${BASE_URL}/conversations`),
        getById: (id) => axios.get(`${BASE_URL}/conversations/${id}`),
        create: (data) => axios.post(`${BASE_URL}/conversations`, data),
        update: (id, data) => axios.put(`${BASE_URL}/conversations/${id}`, data),
        remove: (id) => axios.delete(`${BASE_URL}/conversations/${id}`)
    },
    messages: {
        getAll: () => axios.get(`${BASE_URL}/messages`),
        getById: (id) => axios.get(`${BASE_URL}/messages/${id}`),
        create: (data) => axios.post(`${BASE_URL}/messages`, data),
        update: (id, data) => axios.put(`${BASE_URL}/messages/${id}`, data),
        remove: (id) => axios.delete(`${BASE_URL}/messages/${id}`)
    },
    saved_listings: {
    getAll: () => axios.get(`${BASE_URL}/saved_listings`),
    getByUserId: (userId) => axios.get(`${BASE_URL}/saved_listings/user/${userId}`),
    create: (data) => axios.post(`${BASE_URL}/saved_listings`, data),
    remove: (id) => axios.delete(`${BASE_URL}/saved_listings/${id}`)
},


}

const profileLink = document.getElementById('profile-link')
if (profileLink) {
    if (!localStorage.getItem('user_id')) {
        profileLink.style.display = 'none'
    }
}


