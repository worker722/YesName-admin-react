export const userService = {
   login,
   getConfig,
   changeConfig,
   uploadFile
};

// const SERVER_HOST = "http://localhost:3333";
const SERVER_HOST = "http://tntest.terasys-network.info:3333";

const _REQUESTTOSERVER = (url, params, isForm = false) => {
   return new Promise((resolve, reject) => {
      const isGet = (params === null);
      fetch(`${SERVER_HOST}/admin/${url}`, {
         method: isGet ? 'get' : 'post',
         headers: {
            'content-type': isForm ? 'multipart/form-data' : 'application/json'
         },
         ...(!isGet && { body: isForm ? params : JSON.stringify(params) })
      })
         .then(res => res.json())
         .then(res => resolve(res))
         .catch(err => reject(err));
   })
}
function login(user) {
   return _REQUESTTOSERVER("login", user);
}
function getConfig() {
   return _REQUESTTOSERVER("config", null);
}
function changeConfig(data) {
   return _REQUESTTOSERVER("config/update", data);
}
function uploadFile(formdata) {
   return _REQUESTTOSERVER("upload", formdata, true);
}