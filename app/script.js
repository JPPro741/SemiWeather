/* 
 * Copyright (c) 2025 JPPro741
 * FOR MORE INFO SEE THE LICENSE FILE  
*/

const apiKey = '201989289083be168d20772faebc803e';
//Calcular 5 dias
const datetimeInput = document.getElementById("datetime");
const now = new Date();
const maxDate = new Date();
maxDate.setDate(now.getDate() + 5); // sumar 5 días

document.getElementById("result").style.display = "none";

//Formatear fecha a Y-M-DTH-M
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// Establecer los límites de 5 dias al selector de fecha
datetimeInput.min = formatDate(now);       // mínimo: ahora
datetimeInput.max = formatDate(maxDate);   // máximo: +5 días



//Conseguir clima 
async function getWeather() {
  document.getElementById("result").style.display = "block";
  const city = document.getElementById('city').value.trim();
  const datetime = document.getElementById('datetime').value;
  const resultDiv = document.getElementById('result');

  //Detectar que se hayan introducido la fecha y lugar
  if (!city || !datetime) {
    resultDiv.innerHTML = "<h3>Porfavor introduzca un lugar y hora.</h3>";
    return;
  }

  const userDate = new Date(datetime);

  try {
    //LLAMADA API :D
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    //ERROR?
    if (data.cod !== "200") {
      resultDiv.innerHTML = `<h3>Error: ${data.message}</h3>`;
      return;
    }
    //Hora mas cercana en la respuesta api
    const closest = data.list.reduce((prev, curr) => {
      const prevDiff = Math.abs(new Date(prev.dt_txt) - userDate);
      const currDiff = Math.abs(new Date(curr.dt_txt) - userDate);
      return currDiff < prevDiff ? curr : prev;
    });

    //Pasar a hora local
    const localTime = new Date(closest.dt_txt).toLocaleString();

    //Escribir la info
    const weatherHTML = `
      <h2>Clima en ${data.city.name} a las ${localTime} (Hora local mas cercana)</h2>
      <p><strong>Temperatura:</strong> ${closest.main.temp}°C</p>
      <p><strong>Clima:</strong> ${closest.weather[0].description}</p>
      <p><strong>Humedad:</strong> ${closest.main.humidity}%</p>
      <p><strong>Velocidad del viento:</strong> ${closest.wind.speed} m/s</p>
    `;

    resultDiv.innerHTML = weatherHTML;

  } catch (error) {
    resultDiv.innerHTML = `<h3>Error desconocido =(.</h3>`;
    console.error(error);
  }
}
//Cambiar fondo segun hora =D
document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("mainBody");

  function changeBG(dn) {
    if (dn == "day") {
      body.style.background = "linear-gradient(135deg, #89f7fe, #66a6ff)";
    } else {
      body.style.background = "linear-gradient(135deg, #232526, #414345)";
    }
  }

  changeBG("day");
});


