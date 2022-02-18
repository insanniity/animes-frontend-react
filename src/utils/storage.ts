import { LoginResponse } from "types/auth";

const KEY_TOKEN = "authData";

//Generic
export const saveDataOnStorage = (key: string, obj: any) => {
    localStorage.setItem(key, JSON.stringify(obj));
  };
  
export const removeDataOnStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const getDataOnStorage = (key: string) => {
  const str = localStorage.getItem(key) ?? "{}";
  return JSON.parse(str);
};


//Auth
export const saveAuthData = (obj: LoginResponse) => {
    localStorage.setItem(KEY_TOKEN, JSON.stringify(obj));
};
  
export const getAuthData = () => {
    const str = localStorage.getItem(KEY_TOKEN) ?? "{}";
    return JSON.parse(str) as LoginResponse;
};
  
export const clearStorage = () => {
    localStorage.clear();
}