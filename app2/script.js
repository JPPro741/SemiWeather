// Example AJAX POST to Flask backend
const LAT = document.getElementById("LAT").value;
const LON = document.getElementById("LON").value;
const DATE = document.getElementById("DATE").value;

fetch("https://weather-backend.onrender.com/submit", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
        LAT: LAT,
        LON: LON,
        DATE: DATE
    })
})
.then(response => response.json())
.then(data => {
    console.log(data);
    // Update your HTML with results
});
