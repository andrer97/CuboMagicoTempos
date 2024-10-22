const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Tempos = db.define('Tempos',{
    nome: {
        type : DataTypes.STRING,
        allowNull : false
    },
    tempos: {
        type : DataTypes.ARRAY(DataTypes.FLOAT),
        allowNull: false,
        validate: {
            len: {
                args: [5, 5],
                msg: 'É necessário fornecer exatamente 5 tempos.'
            }
        }
    },
    media: {
        type : DataTypes.FLOAT,
        defaultValue: 0
    }
})

Tempos.prototype.calcularMedia = function() {
    const temposOrdenados = [this.tempos].sort();
    const temposFiltrados = temposOrdenados.slice(1, 4);
    this.media = 
}

module.exports = Tarefa