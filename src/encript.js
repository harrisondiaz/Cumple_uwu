const CryptoJS = require("crypto-js");

const claveSecreta = "X9r&F$h6qZ3^Uk!d*S2wJb+Q"; // Reemplaza esto con tu propia clave secreta

const acertijos = ["¿Qué es adorable, eléctrico y duerme mucho en un disfraz verde?",
    "Buscas un abrazo suave, de un personaje amarillo, pero este parece un poco más perezoso de lo normal.",
    "Un híbrido único, parte ratón, parte gigante dormilón.",
    "¿Qué es amarillo, eléctrico y lleva puesto el atuendo de un famoso dormilón de la región de Kanto?",
    "Protegido por la capa de un gigante, este pequeño ratón duerme plácidamente.",
    "Un emblema mágico que usas, rojo y violeta que se enlaza con un famoso mago.",
    "Una prenda para los valientes, con un toque de magia y lealtad, ¿a qué casa perteneces?",
    "Viste con orgullo los colores de los valientes, ¿quién es el mago que llevas en tu pecho?",
    "¿Cómo te vistes si eres leal, valiente y tienes una afinidad con un niño que sobrevivió?",
    "Este suéter te mantiene caliente, pero también te llena de coraje y valentía. ¿A quién representa?",
    "Un regalo lleno de luz, con pétalos de color amarillo y rojo.",
    "Un presente que mezcla la pasión y la alegría, ¿qué contiene?",
    "Son dos, pero parecen muchos más. Uno quema con pasión, el otro brilla como el sol.",
    "¿Qué regalo te llena de amor y te hace pensar en días soleados?",
    "Si buscas un detalle que muestre tanto amor como alegría, ¿qué eliges?"];

const acertijosEncriptados = acertijos.map((acertijo) => ({
    texto: CryptoJS.AES.encrypt(acertijo, claveSecreta).toString(),
    desbloqueado: false,
}));

console.log(JSON.stringify(acertijosEncriptados, null, 2));
