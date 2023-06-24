// const { default: axios } = require("axios");

// export const axiosInstance =axios.create({
//     // baseURL : "https://tim-note-app.vercel.app/api/"
//     baseURL: "http://localhost:3000"
// })

import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:3000"
})