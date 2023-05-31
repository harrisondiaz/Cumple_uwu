<template>
    <div id="app">
        <h1>Mi pequeña Nutria 🦦<br>Tu regalo de cumpleaños estara listo en:</h1>
        <div class="countdown">
            <div class="countdown-element">
                <div class="countdown-value">{{ dias }}</div>
                <div class="countdown-label">Días</div>
            </div>
            <div class="countdown-element">
                <div class="countdown-value">{{ horas }}</div>
                <div class="countdown-label">Horas</div>
            </div>
            <div class="countdown-element">
                <div class="countdown-value">{{ minutos }}</div>
                <div class="countdown-label">Minutos</div>
            </div>
            <div class="countdown-element">
                <div class="countdown-value">{{ segundos }}</div>
                <div class="countdown-label">Segundos</div>
            </div>
        </div>
        <h2>Como pequeña sorpresa y para darle dinamismo y para que no te quedes
        con las ganas de saber que es tu cumpleaños prepare esto en los proximos dias, estare agregando más frases
        y tal vez más acertijos. 😊</h2>
        <h3>Acertijos:</h3>
        <ul>
            <li v-for="(acertijo, index) in acertijos" :key="'acertijo-' + index">
                <span  v-if="desbloquearAcertijo(index)">{{ desencriptar(acertijo.texto) }}</span>
                <span  v-else>🔒 Este mensaje no esta disponible aun.</span>
            </li>
        </ul>
        <h3>Frases:</h3>
        <ul>
            <li v-for="(frase, index) in frases" :key="'frase-' + index">
                <span v-if="desbloquearFrase(index)">{{ frase.texto }}</span>
                <span v-else>🔒  Este mensaje no esta disponible aun.</span>
            </li>
        </ul>
    </div>
</template>


<script>
import moment from "moment";
import CryptoJS from "crypto-js";
import confetti from "canvas-confetti";
export default {
  name: "App",
  data() {
    return {
      fechaCumpleanos: "2023-05-31 21:15:00",
      dias: 0,
      horas: 0,
      minutos: 0,
      segundos: 0,
        frases: [{
            texto: "El amor no mira con los ojos, sino con el alma. - William Shakespeare, Sueño de una noche de verano",
            desbloqueado: true
        },
            {
                texto: "\"Si he de amar que sea a un loco, loco de remate, que se deje engullir por el dragón para luego salir de su vientre estirando las comisuras de la boca hasta convertirla en una sonrisa.\" - Laura Esquivel, \"Como agua para chocolate\".",
                desbloqueado: false
            },{
                texto: "No hay remedio para el amor, excepto amar más. - Henry David Thoreau, Diarios",
                desbloqueado: false
            },
            {
                texto: "Cada vez que te miro, te imagino, te deseo, te amo. - Anaïs Nin, Diarios",
                desbloqueado: false
            },
            {
                texto: "El amor no consiste en mirarse el uno al otro, sino en mirar juntos en la misma dirección. - Antoine de Saint-Exupéry, El Principito",
                desbloqueado: false
            },
            {
                texto: "El amor es un fuego invisible, una herida placentera, un gusto sabroso de veneno, una dulce amargura, un deleitable dolor, una alegre tormenta, una fiera y juguetona calma. - Fernando de Rojas, La Celestina",
                desbloqueado: false
            },
            {
                texto: "El amor es la única respuesta que conocemos al miedo y a la oscuridad. - Alice Walker, La tercera vida de Grange Copeland",
                desbloqueado: false
            },
            {
                texto: "Ser amado profundamente por alguien te da fuerza, mientras que amar a alguien profundamente te da coraje. - Lao Tzu",
                desbloqueado: false
            },
            {
                texto: "El amor es la fuerza más sutil del mundo. - Mahatma Gandhi",
                desbloqueado: false
            },
            {
                texto: "El amor es una condición en la que la felicidad de otra persona es esencial para la propia. - Robert A. Heinlein, Extraño en tierra extraña",
                desbloqueado: false
            },
            {
                texto: "El amor no tiene edad, siempre está naciendo. - Blaise Pascal, Pensamientos",
                desbloqueado: false
            },{
                texto: "\"Eres mi sendero. Eres mi luz en tiempos oscuros.\" - Peter Parker, Spider-Man 3",
                desbloqueado: false
            },{
                texto: "\"Todavía soy Spider-Man. Pero ahora también tengo que ser Peter Parker. Y necesito que estés a mi lado.\" - Peter Parker, Spider-Man 2",
                desbloqueado: false
            },{
                texto: "\"¿Sabes lo que siempre he querido hacer? Estar contigo.\" - Peter Parker, The Amazing Spider-Man",
                desbloqueado: false
            }, {
                texto: "\"Te amé como amé a muy pocos; con ternura, con devoción, con un amor tan real que nada más podría existir, sino tú en mi universo.\" - Paulo Coelho",
                desbloqueado: false
            }
        ],
        acertijos: [
            {
                texto: 'U2FsdGVkX1/vOv3WNQzNh+5mQEPpkljQwY+X+2y/jxyoSWAQO4W1Ha1T1Ux4Qb+/OcPmI3pQTFeVHGM+j1rehg==',
                desbloqueado: false
            },
            {
                texto: 'U2FsdGVkX1/cmcxmZUWbC9pr4vNu0UCgv4vV+UKfnM68RjDaxhlgKSx+IYkMa74nHnkpBxv1Da2pLDxN2bCTTg==',
                desbloqueado: true
            },
            {
                texto: 'U2FsdGVkX18QP5bvIQe0ACvLnsNLtbSNjemki3een2/XpEtvRJQeejVWYpYRaFCpw0mqb+3w/6uhzFewmPLq7Q==',
                desbloqueado: false
            },
            {
                texto: 'U2FsdGVkX19Dey4k3lISSTbOQZPMqK5/Ut1WNktMHFUPdBxEbKpFEBK5iCuACLyy+K8dNQbJEMRXTXTjkVeZIQ==',
                desbloqueado: false
            },
            {
                texto: 'U2FsdGVkX18JYSA4+osCnNYWk3rGbhiTM+hFVguVCtJUr+6/i7nsoD9eapHJfynx3JSUZ3d3tEt+hBBF0kFEQA==',
                desbloqueado: false
            },
            {
                texto: 'U2FsdGVkX1+yHbvS1pXlmSxWkdX4AcX4K82UuRLgecVWRKWL9/ka98GP8+wpuEK0jkGVDU/Y28DDWEi22rC4/g==',
                desbloqueado: false
            },
            {
                texto: 'U2FsdGVkX1/9Fs7DetFYtLZC2SnqwozUEbxV3b3kDGZhdUV/FZo6fbhO5KTYRBkztfOiFCUqnXT7v09rIvyIPZ3osg6HT1w8UlCE4xfKO+k=',
                desbloqueado: false
            },
            {
                texto: 'U2FsdGVkX189yiD9e7h1wHR9kd2p6cxxOOi1CPOJJlceddIVz4ACjB7VMIMRmygP',
                desbloqueado: false
            },
            {
                texto: 'U2FsdGVkX1+ynwypParGlpiFvhZ6WXGFfrxNNNGWWozcyuJ14+OFi1GiC1823M2tJSwqkeZKhRevlx5d6Pv0cg==',
                desbloqueado: false
            },
            {
                texto: 'U2FsdGVkX18TRfk50GPhZXd31x+LbghZRTJz3/y6YNb5/ZaU420OzPFItYUOlF4R5mm/EokIYdUyhbdX2NVZnA==',
                desbloqueado: false
            },
            {
                texto: 'U2FsdGVkX19OxL9yV8JiiDqjK+CZoup0XPIdl7XnHT2zeJh7EH7da3HgY0Aic3OByPIh8jVlRyP+CgA2PCeH+g==',
                desbloqueado: false
            },
            {
                texto: 'U2FsdGVkX18PxAkZnGKOKyu1rfe+S+Hr1suj2wutZLcV9+Kh+SHYhfzgt6BAcG7hjzE5jhjDOxWlLp71xM/8QQ==',
                desbloqueado: false
            },
            {
                texto: 'U2FsdGVkX18HWpn5mHmjvfz8Ib83Hw0KJLQ6/QBZwg4F2lhbAgOJL/OwK1mGkmkvRBtvIT3o/sPd95Lj3JGxHA==',
                desbloqueado: false
            },
            {
                texto: 'U2FsdGVkX1/ajarXw+HHGIaf/160aexD9wEtgjVFNHiY3JUFGio0fpmKVJZvsWWhtoA7gE1t+b7FmoIaB5Vv+A==',
                desbloqueado: false
            },
            {
                texto: 'U2FsdGVkX1+6o4GifI1UpXqbJBWAtGMJIDJGUlA5xIHOXtvIIOV0T1k5zT+BaH3wG+DJGNV0awf57nK/puMFRw==',
                desbloqueado: false
            },{
                "texto": "U2FsdGVkX19pcnWL/1cPyWji5gY6e21J/8dRhFld1KeWM5sXuhOJV0iDBKyDqjoyknDdMHwWWlXOPdJhta4akVcNNEPdgzM+6SoLUT5ulE7OK3gzPfgUGnb9N7cLFSbO",
                "desbloqueado": false
            }
        ],

    };
  },
  methods: {
      lanzarConfeti() {
          confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
          });
      },
    actualizarCuentaRegresiva() {
      const ahora = moment();
      const cumpleanos = moment(this.fechaCumpleanos);
      const duracion = moment.duration(cumpleanos.diff(ahora));
      this.dias = duracion.days();
      this.horas = duracion.hours();
      this.minutos = duracion.minutes();
      this.segundos = duracion.seconds();
    },
    desbloquearAcertijo(index) {
      const inicio = new Date("2023-05-05");
      const ahora = new Date();
      const diasTranscurridos = Math.floor((ahora - inicio) / (1000 * 60 * 60 * 24));
      const acertijosDesbloqueados = Math.floor(diasTranscurridos / 2);
      return true;
    },
      desencriptar(textoEncriptado) {
          const claveSecreta = "X9r&F$h6qZ3^Uk!d*S2wJb+Q";
          try {
              const bytes = CryptoJS.AES.decrypt(textoEncriptado, claveSecreta);
              const textoOriginal = bytes.toString(CryptoJS.enc.Utf8);
              return textoOriginal;
          } catch (error) {
              console.error(error);
              return "Error al desencriptar el mensaje";
          }
      },
      desbloquearFrase(index) {
          const inicio = new Date("2023-05-05");
          const ahora = new Date();
          const diasTranscurridos = Math.floor((ahora - inicio) / (1000 * 60 * 60 * 24));
          const frasesDesbloqueadas = (diasTranscurridos/2);
          return true;
      },lanzarConfetiAleatorio() {
          this.lanzarConfeti();
          const tiempoAleatorio = Math.random() * (5000 - 1000) + 1000;
          setTimeout(() => {
              this.lanzarConfetiAleatorio();
          }, tiempoAleatorio);
      }

  },
  mounted() {
    this.actualizarCuentaRegresiva();
    setInterval(this.actualizarCuentaRegresiva, 1000);
    this.lanzarConfetiAleatorio();
  }
};
</script>

<style>
body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 0;
}

#app {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
    text-align: center;
}

.countdown {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
}

.countdown-element {
    flex: 1;
    min-width: 100px;
    margin: 0.5rem;
    text-align: center;
}

.countdown-value {
    font-size: 2rem;
    font-weight: bold;
    background-color: #222;
    color: #fff;
    padding: 0.5rem 2rem;
    border-radius: 5px;
}

.countdown-label {
    font-size: 1rem;
    font-weight: normal;
    margin-top: 0.25rem;
}

h1 {
    font-size: 2.5rem;
}

h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 0.5rem;
}

@media (max-width: 600px) {
    h1 {
        font-size: 2rem;
    }

    h3 {
        font-size: 1.2rem;
    }

    .countdown-value {
        font-size: 1.5rem;
        padding: 0.25rem 1.5rem;
    }
}
</style>
