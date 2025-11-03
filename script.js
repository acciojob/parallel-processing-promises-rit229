//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(`Failed to load image at ${url}`);
    });
}

function downloadImages() {
    const loading = document.getElementById("loading");
    const errorDiv = document.getElementById("error");
    
    // Clear previous results
    errorDiv.innerHTML = '';
    output.innerHTML = '';
    
    loading.style.display = 'block'; // Show loading spinner
    
    const promises = images.map(image => downloadImage(image.url));
    
    Promise.all(promises)
        .then(loadedImages => {
            loading.style.display = 'none'; // Hide loading spinner
            loadedImages.forEach(img => output.appendChild(img)); // Display images
        })
        .catch(err => {
            loading.style.display = 'none'; // Hide loading spinner
            errorDiv.innerHTML = err; // Show error message
        });
}

btn.addEventListener("click", downloadImages);
