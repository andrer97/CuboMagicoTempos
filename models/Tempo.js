const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Tempo = db.define('Tempo',{
    nome: {
        type : DataTypes.STRING,
        allowNull : false
    },
    tempo1: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    tempo2: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    tempo3: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    tempo4: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    tempo5: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    media: {
        type : DataTypes.FLOAT,
        defaultValue: 0
    }
})

Tempo.prototype.calcularMedia = function() {
    const tempos = [this.tempo1, this.tempo2, this.tempo3, this.tempo4, this.tempo5];
    const temposOrdenados = [...tempos].sort((a, b) => a - b);
    const temposFiltrados = temposOrdenados.slice(1, 4);
    
    /*let soma = 0;
    for (let i = 0; i < temposFiltrados.length; i++) {
        const tempo = temposFiltrados[i];
        soma += tempo;
    }*/
    this.media = parseFloat((temposFiltrados.reduce((soma, tempo) => soma + tempo, 0) / temposFiltrados.length).toFixed(2));
}

Tempo.prototype.maiorMenor = function() {
    const tempos = [this.tempo1, this.tempo2, this.tempo3, this.tempo4, this.tempo5];
    return {
        maior: Math.max(...this.tempos),
        menor: Math.min(...this.tempos),
    }
}

module.exports = Tempo