window.addEventListener("load", () => {
    let selectProvincias = document.querySelector("#selectProvincias");
    let selectLocalidades = document.querySelector("#selectLocalidades");
    const API_BASE_URL = "https://apis.datos.gob.ar/georef/api/"
    selectProvincias.addEventListener("change", async (event) => {
        let provinceId = event.target.value;    
        try {
            const response = await fetch(`${API_BASE_URL}localidades?provincia=${provinceId}&campos=id,nombre&max=5000`) 
            const { localidades } = await response.json();
            selectLocalidades.innerHTML = "";
            const obtenerOption = (nombre) => {
                return `<option value='${nombre}'>${nombre}</option>`
            }
            localidades.forEach(localidad => {
                selectLocalidades.innerHTML += obtenerOption(localidad.nombre);
            });
        } catch (error) {
            alert("Error inesperado!")
            console.error(error)
        }
    })
})