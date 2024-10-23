const contenedorPrincipal = document.querySelector('.contenedor-principal')
const main = document.querySelector('.main')
const selected = document.querySelector('.selected')
const volver = document.querySelector('.volver')
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
    const paises = await obtenerPaises();
    paises.forEach(pais => {
        const div = document.createElement('DIV');
        const bandera = document.createElement('IMG');
        const paisName = document.createElement('P');
        const paisPoblacion = document.createElement('P');
        const area = document.createElement('P');
        const region = document.createElement('P');

        div.classList.add('pais', pais.name.common.replace(/\s+/g, '-'));
        bandera.src = `${pais.flags.png}`;
        paisName.textContent = `${pais.name.common}`;
        paisPoblacion.textContent = `${pais.population}`;
        area.textContent = ` ${pais.area}`;
        region.textContent = `${pais.region}`;

        div.appendChild(bandera);
        div.appendChild(paisName);
        div.appendChild(paisPoblacion);
        div.appendChild(area);
        div.appendChild(region);
        contenedorPrincipal.appendChild(div);
    });

    const paisesdiv = document.querySelectorAll('.pais');

    paisesdiv.forEach(paisDiv => {
        paisDiv.addEventListener('click', () => {
            paises.forEach(pais => {
                const comparator = pais.name.common.replace(/\s+/g, '-');
                if (paisDiv.classList.contains(comparator)) {
                    main.style.display = 'none';
                    selected.style.display = 'flex';
                    volver.style.display = 'block'
                    selected.style.animation = 'entrada .2s ease-in';
                    const flag = document.createElement('IMG')
                    flag.src = pais.flags.png 
                    selected.appendChild(flag)
                    for (let i = 0; i < 5; i++) {
                        const newDiv = document.createElement('DIV');
                        const p1 = document.createElement('P');
                        const p2 = document.createElement('P');

                        if (i === 0) {
                            p1.textContent = `Capital : ${pais.capital[0]}`;
                            p2.textContent = `Población: ${pais.population}`;
                        } else if (i === 1) {
                            p1.textContent = `Área total: ${pais.area} km²`;
                            p2.textContent = `Región: ${pais.region}`;
                        } else if (i === 2) {
                            p1.textContent = `Subregión: ${pais.subregion || 'N/A'}`;
                            p2.textContent = `Capital: ${pais.capital ? pais.capital[0] : 'N/A'}`;
                        } else if (i === 3) {
                            p1.textContent = `Densidad de población: ${(pais.population / pais.area).toFixed(2)} hab/km²`;
                            p2.textContent = `Moneda: ${Object.values(pais.currencies || {})[0]?.name || 'N/A'}`;
                        } else {
                            p1.textContent = `Idiomas: ${Object.values(pais.languages || {}).join(', ')}`;
                            p2.textContent = `Fronteras: ${pais.borders?.join(', ') || 'Sin fronteras'}`;
                        }

                        // Agregar los párrafos al nuevo div
                        newDiv.appendChild(p1);
                        newDiv.appendChild(p2);

                        // Agregar el nuevo div a la sección seleccionada
                        selected.appendChild(newDiv);
                    }
                }
            });
        });
    });
}

mostrarPaises();

volver.addEventListener('click', ()=> {
  selected.style.display = 'none'
  volver.style.display = 'none'
  selected.innerHTML = '';
  main.style.display = 'flex'
  main.style.animation = 'entrada .2s ease-in'
})
 
  