import axios from "axios";

const BASE_URL = "https://fair-cyan-catfish-cape.cyclic.app/api/";

let TOKEN = "";
if (typeof window !== "undefined") {
  try {
    const persistRoot = localStorage.getItem("persist:root");
    if (persistRoot) {
      const user = JSON.parse(persistRoot)?.user;
      const currentUser = user && JSON.parse(user).currentUser;
      TOKEN = currentUser?.accessToken || "";
    }
  } catch (err) {
    console.error("Error reading token from local storage", err);
  }
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
