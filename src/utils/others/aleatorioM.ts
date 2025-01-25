

export default function aleatorio(lista) {
    try {
        let aleatorio = lista[Math.floor(Math.random() * lista.length)];
        return aleatorio;
    } catch (err) {
        console.log(err);
        return;
    }
}

export {aleatorio}
