const Tempo = require('../models/Tempo')

module.exports = class TempoController{
    static criarTempo(req,res){//get
        res.render('tempos/criar')
    }

    static async criarTempoPost(req,res){//post
        const tempo = {
            nome : req.body.nome,
            tempo1: parseFloat(req.body.tempo1),
            tempo2: parseFloat(req.body.tempo2),
            tempo3: parseFloat(req.body.tempo3),
            tempo4: parseFloat(req.body.tempo4),
            tempo5: parseFloat(req.body.tempo5),
        }

        const novoRegistro = Tempo.build(tempo);//nova instancia sem salvar no banco de dados
        novoRegistro.calcularMedia();

        console.log(tempo);
        console.log(novoRegistro)

        try{
          await novoRegistro.save();//bd
          res.redirect('/tempo');
        } catch (err) {
          console.log('Erro: ',err);
        }
        
    }

    static mostrarTempos(req, res) {//get
        Tempo.findAll({ raw: true })
          .then((data) => {
            let nenhumRegistro = false //nenhuma tarefa cadastrada
    
            if (data.length === 0) {
              nenhumRegistro = true
            }
    
            res.render('tempos/todos', { tempos: data, nenhumRegistro })
          })
          .catch((err) => console.log(err))
      }

      static async removeTempo(req, res) {
        const id = req.body.id
    
        await Tarefa.destroy({ where: { id: id } })
          .then(res.redirect('/tempos'))
          .catch((err) => console.log())
      }
    
      static atualizarTarefa(req, res) {
        const id = req.params.id
    
        Tarefa.findOne({ where: { id: id }, raw: true })
          .then((data) => {
            res.render('tarefas/editar', { tarefa: data })
          })
          .catch((err) => console.log())
      }
    
      static async atualizarTarefaPost(req, res) {
        const id = req.body.id
    
        const tarefa = {
          titulo: req.body.titulo,
          descricao: req.body.descricao,
        }
    
        await Tarefa.update(tarefa, { where: { id: id } })
          .then(res.redirect('/tarefas'))
          .catch((err) => console.log())
      }
    
      static async atualizarStatus(req, res) {
        const id = req.body.id
    
        console.log(req.body)
    
        const tarefa = {
          concluida: req.body.concluida === '0' ? true : false,
        }
    
        console.log(tarefa)
    
        await Tarefa.update(tarefa, { where: { id: id } })
          .then(res.redirect('/tarefas'))
          .catch((err) => console.log())
      }     
}