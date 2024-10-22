const contenedorPrincipal = document.querySelector('.contenedor-principal')
async function obtenerPaises() {
    try {
      const respuesta = await fetch('https://restcountries.com/v3.1/all');
      if (respuesta.ok) {
        const datos = await respuesta.json();
        console.log(datos);
        return datos; 
      } else {
        console.error('Error al traer los datos:', respuesta.status);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }

  async function mostrarPaises() {
    const paises = await obtenerPaises()
    paises.forEach(pais => {
        const div = document.createElement('DIV')
        const bandera = document.createElement('IMG')
        const paisName = document.createElement('P')
        const paisPoblacion = document.createElement('P')
        const area = document.createElement('P')
        const region = document.createElement('P')
        div.classList.add('pais', pais.name.common.replace(/\s+/g, '-'))
        bandera.src = `${pais.flags.png}`
        paisName.textContent = `${pais.name.common}`
        paisPoblacion.textContent = `${pais.population}`
        area.textContent = `${pais.area}`
        region.textContent = `${pais.region}`
        div.appendChild(bandera)
        div.appendChild(paisName)
        div.appendChild(paisPoblacion)
        div.appendChild(area)
        div.appendChild(region)
        contenedorPrincipal.appendChild(div)
        
    });
  }

  mostrarPaises()