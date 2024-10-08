import { post } from 'axios';
import AppConfig from "constants/AppConfig";
export const userService = {
   login,
   getConfig,
   changeConfig,
   uploadFile,
   getUsers,
   deleteUser,
   getStates,
   updateUser,
   getFriends,
   getStorageDetail,
   clearStorage
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
function updateUser(userid, data) {
   return _REQUESTTOSERVER(`user/update/${userid}`, data);
}
function deleteUser(userid) {
   return _REQUESTTOSERVER("users/delete", { userid });
}
function getStates() {
   return _REQUESTTOSERVER("states", null);
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
function getFriends(userid) {
   return _REQUESTTOSERVER("users/friends", { userid });
}
function getStorageDetail() {
   return _REQUESTTOSERVER("files", null);
}
function clearStorage() {
   return _REQUESTTOSERVER("files/clear", null);
}