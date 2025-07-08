import axios from "axios";

const axiosLocal = axios.create({
  baseURL: "https://project-hsc-server-gmsgj37ir-tmdsifat98s-projects.vercel.app",
});

const useAxiosLocal = () => {
  return axiosLocal;
};

export default useAxiosLocal;