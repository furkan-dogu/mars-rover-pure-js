const buttonsDiv = document.querySelector(".buttons");
const h3Photos = document.querySelector(".photos");
const cards = document.querySelector(".cards");

let info = [];
let filteredPhotos = []

const API_KEY = import.meta.env.VITE_API_KEY;

const getData = async () => {
    const URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`;
    try {
        const res = await fetch(URL);
        if (!res.ok) {
            throw new Error(res.status);
        }
        const data = await res.json();
        info = data.photos;
        filteredPhotos = info
        getPhotos()
        h3Visibility()
    } catch (error) {
        console.log(error);
    }
};

getData()

const buttons = () => {
    const cameras = ["ALL", "FHAZ", "NAVCAM", "MAST", "CHEMCAM", "RHAZ"]

    cameras.forEach((button) => {
        const btn = document.createElement("button")
        btn.innerText = button
        buttonsDiv.appendChild(btn)
    })
}

buttons()

const getPhotos = () => {
    cards.innerHTML = ""

    filteredPhotos.forEach((item) => {
        // Card div
        const cardDiv = document.createElement("div")
        cardDiv.classList.add("card")

        // img
        const img = document.createElement("img")
        img.src = item.img_src
        img.alt = item.id

        // date
        const date = document.createElement("p")
        date.innerText = `Date: ${item.earth_date}`

        // camera
        const camera = document.createElement("p")
        camera.innerText = `Camera: ${item.camera.full_name}`

        cardDiv.appendChild(img)
        cardDiv.appendChild(date)
        cardDiv.appendChild(camera)
        
        cards.appendChild(cardDiv)
    })
}

const h3Visibility = () => {
    if (filteredPhotos.length) {
        h3Photos.textContent = `Photos (${filteredPhotos.length} Pieces)`
        h3Photos.style.display = 'block';
    } else {
        h3Photos.style.display = 'none'
    }
}

buttonsDiv.addEventListener("click", (e) => {   
        const camera = e.target.innerText;

        if (camera === "ALL") {
            filteredPhotos = info;
        } else {
            filteredPhotos = info.filter(item => item.camera.name === camera);
        }

        getPhotos(); 
        h3Visibility(); 
});