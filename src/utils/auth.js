import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const Name = 'Admin-Name'
const Phone = 'Admin-Phone'
const Role = 'Admin-Role'

export function getToken() {
   return Cookies.get(TokenKey)
}

export function setToken(token) {
   return Cookies.set(TokenKey, token)
}
export function removeToken() {
   return Cookies.remove(TokenKey)
}

export function setName(name) {
   return Cookies.set(Name,name)
}
export function getName() {
   return Cookies.get(Name)
}

export function setPhone(phone) {
   return Cookies.set(Phone,phone)
}
export function getPhone() {
   return Cookies.get(Phone)
}
export function setRole(role) {
   return Cookies.set(Role,role)
}
export function getRole() {
   return Cookies.get(Role)
}