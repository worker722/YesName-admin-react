export const userService = {
   login,
   getConfig
};

const SERVER_HOST = "http://localhost:3333"

const _REQUESTTOSERVER = (url, params) => {
   return new Promise((resolve, reject) => {
      const isGet = (params === null);
      fetch(`${SERVER_HOST}/admin/${url}`, {
         method: isGet ? 'get' : 'post',
         headers: {
            'content-type': 'application/json'
         },
         ...(!isGet && { body: JSON.stringify(params) })
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