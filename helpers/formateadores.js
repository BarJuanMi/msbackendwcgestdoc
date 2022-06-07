const formatearNumCelular = (numCelular) => {
    let telcelAux = numCelular.substring(0, 3) + ' ' + numCelular.substring(3, numCelular.length);

    return telcelAux;
}

const formatearGenero = (acronimo) => {
    if (acronimo === 'F') {
        return 'FEMENINO';
    } else if (acronimo === 'M') {
        return 'MASCULINO';
    } else {
        return 'INDETERMINADO';
    }
}

Date.prototype.addHours = function(h) {
    this.setHours(this.getHours() + h);
    return this;
}

const addHoursDate = (fechaString) => {
    fecha = new Date(fechaString);
    fecha.addHours(Number(process.env.COUNT_HOURS_TO_ADD));
    return fecha;
}

//capitalize only the first letter of the string. 
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
//capitalize all words of a string. 
function capitalizeWords(string) {
    return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};


module.exports = {
    formatearNumCelular,
    formatearGenero,
    addHoursDate,
    capitalizeWords
}