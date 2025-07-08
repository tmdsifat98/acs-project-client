import axios from "axios";

const axiosLocal = axios.create({
  baseURL: "https://project-hsc-server.vercel.app",
});

const useAxiosLocal = () => {
  return axiosLocal;
};

export default useAxiosLocal;