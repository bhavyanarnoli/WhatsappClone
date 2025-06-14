import axios from 'axios';

const url = 'http://localhost:8000';
const API = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 30000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

// Add request interceptor for file uploads
API.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const addUser = async (data) => {
  try{
    await axios.post(`${url}/add`, data);
  }
  catch(error){
    console.log('Error while addUser API', error.message);
    }
}

export const getUsers = async () => {
  try{
    let response=  await axios.get(`${url}/users`);
    console.log(response);
    return response.data;
  }
  catch(error){
    console.log('Error while getUsers API', error.message);
  }
}

export const setConversation = async (data) => {
  try {
    const response = await axios.post(`${url}/conversation/add`, data);
    return response.data;
  } catch(error) {
    console.log('Error while setConversation API', error.response?.data || error.message);
    throw error; 
  }
}

export const getConversation = async (data) => {
  try {
    let response = await axios.post(`${url}/conversation/get`, data);
    return response.data;
  } catch(error) {
    console.log('Error while getConversation API', error.response?.data || error.message);
    throw error; 
  }
}

export const newMessage = async (data) => {
  try {
    let response = await axios.post(`${url}/messages/add`, data);
    return response.data;
  } catch(error) {
    console.log('Full error details:', error);
  }
}

export const getMessages = async (id) => {
  try {
    let response = await axios.post(`${url}/messages/get/${id}`);
    return response.data;
  } catch(error) {
    console.log('Error while fetching messages:', error.message);
    return []; 
  }
}

// export const uploadFile = async (formData) => {
//     try {
//         console.log(' file received for upload:', formData.get('file'));
//         const response = await axios.post(`${url}/file/upload`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//             timeout: 30000,
//             onUploadProgress: (progressEvent) => {
//                 const percentCompleted = Math.round(
//                     (progressEvent.loaded * 100) / progressEvent.total
//                 );
//                 console.log(`Upload progress: ${percentCompleted}%`);
//             }
//         });
//         console.log('Upload successful:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Upload failed with details:', {
//             config: error.config,
//             response: error.response?.data,
//             stack: error.stack
//         });
//         throw error;
//     }
// };
// api.js
export const uploadFile = async (file, maxRetries = 3) => {
  const form = new FormData();
  form.append('file', file);          // 👈 field name *must* match single('file')

  for (let attempt = 0; attempt < maxRetries; /* ++ in loop */) {
    try {
      const { data: health } = await axios.get(`${url}/upload-health`);
      if (!health.ready) {                       // server still warming up
        await new Promise(r => setTimeout(r, (health.retryAfter || 5) * 1000));
        continue;
      }

      const { data } = await axios.post(`${url}/file/upload`, form, {
        onUploadProgress: e =>
          console.log(`Upload ${Math.round((e.loaded * 100) / e.total)}%`)
      });
      return data;                               // 🎉 done
    } catch (err) {
      attempt++;
      if (attempt >= maxRetries) throw err;
      await new Promise(r => setTimeout(r, Math.min(1000 * 2 ** attempt, 10000)));
    }
  }
};
