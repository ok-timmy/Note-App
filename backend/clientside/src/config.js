const { default: axios } = require("axios");

export const axiosInstance =axios.create({
    baseURL : "https://tim-note-app.vercel.app/api/"
})