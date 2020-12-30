import { post } from 'axios';
import AppConfig from "constants/AppConfig";
export const userService = {
   login,
   getConfig,
   changeConfig,
   uploadFile,
   getUsers,
   deleteUser
};

const _REQUESTTOSERVER = (url, params) => {
   return new Promise((resolve, reject) => {
      const isGet = (params === null);
      let options = {
         method: isGet ? 'get' : 'post',
         headers: {
            'Content-Type': 'application/json'
         },
         ...(!isGet && { body: JSON.stringify(params) })
      };
      fetch(`${AppConfig.SERVER_HOST}/admin/${url}`, options)
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
function getUsers() {
   return _REQUESTTOSERVER("users", null);
}
function deleteUser(userid) {
   return _REQUESTTOSERVER("users/delete", { userid });
}
function uploadFile(file) {
   const url = `${AppConfig.SERVER_HOST}/admin/upload`;
   const formData = new FormData();
   formData.append('file', file)
   const config = {
      headers: {
         'content-type': 'multipart/form-data'
      }
   }
   return post(url, formData, config)
}