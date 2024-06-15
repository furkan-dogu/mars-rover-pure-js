const buttonsDiv = document.querySelector(".buttons");
const h3Photos = document.querySelector(".photos");
const cards = document.querySelector(".cards");
const loadingGif = document.querySelector(".loading");
const screen = document.querySelector(".screen");

let info = [];
let filteredPhotos = []
let loading = false
let cameraName = "ALL"

const API_KEY = import.meta.env.VITE_API_KEY;

//+ Veri çekme işlemi
const getData = async () => {
    setLoading(true)

    const URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`;
    try {
        const res = await fetch(URL);
        if (!res.ok) {
            throw new Error(res.status);
        }
        const data = await res.json();
        info = data.photos;
        filteredPhotos = info
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false)
        getPhotos()
        setCameraName(cameraName)
    }
};

//! Loading gif çalışma durumu fonksiyonu
const setLoading = (isLoading) => {
    loading = isLoading;

    if (loading) {
        loadingGif.style.display = 'block';
        screen.style.display = 'none';
    } else {
        loadingGif.style.display = 'none';
        screen.style.display = 'block';
    }
}

getData()

//# Butonların oluştuğu fonksiyon
const buttons = () => {
    const cameras = ["ALL", "FHAZ", "NAVCAM", "MAST", "CHEMCAM", "RHAZ"]

    cameras.forEach((button) => {
        const btn = document.createElement("button")
        btn.innerText = button
        buttonsDiv.appendChild(btn)
    })
}

buttons()

//+ API'deki fotoğrafların ekrana basılmasını sağlayan fonksiyon
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

//! Photos h3'ünün isim değişikliği fonksiyonu
const setCameraName = (item) => {
    cameraName = item

    if (cameraName === "ALL") {
        h3Photos.textContent = "ALL PHOTOS";
    } else {
        h3Photos.textContent = `${cameraName} PHOTOS`;
    }
}

//# Butonlara işlev verilen fonksiyon
buttonsDiv.addEventListener("click", (e) => {
    const camera = e.target.innerText;

    if (camera === "ALL") {
        filteredPhotos = info;
    } else {
        filteredPhotos = info.filter(item => item.camera.name === camera);
    }

    getPhotos();
    setCameraName(camera)
});