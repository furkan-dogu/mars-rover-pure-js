import axios from "axios";

const buttons = document.querySelector(".buttons");
const h3Photos = document.querySelector(".photos");
const cards = document.querySelector(".cards");

let info = [];

const API_KEY = import.meta.env.VITE_API_KEY;

const getData = async () => {
    try {
        const { data } = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`)
        info = data
    } catch (error) {
        
    }

};

getData()