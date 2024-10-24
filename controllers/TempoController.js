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

        //console.log(tempo);
        //console.log(novoRegistro)

        try{
          await novoRegistro.save();//bd
          res.redirect('/tempos');
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
    
        await Tempo.destroy({ where: { id: id } })
          .then(res.redirect('/tempos'))
          .catch((err) => console.log())
      }
    
      static atualizarTempo(req, res) {
        const id = req.params.id
    
        Tempo.findOne({ where: { id: id }, raw: true })
          .then((data) => {
            res.render('tempos/editar', { tempo: data })
          })
          .catch((err) => console.log())
      }
    
      static async atualizarTempoPost(req, res) {
        const id = req.body.id
    
        const tempo = {
          nome: req.body.nome,
          tempo1: parseFloat(req.body.tempo1),
          tempo2: parseFloat(req.body.tempo2),
          tempo3: parseFloat(req.body.tempo3),
          tempo4: parseFloat(req.body.tempo4),
          tempo5: parseFloat(req.body.tempo5),
      };
  
      const temposAtualizados = Tempo.build(tempo);
      temposAtualizados.calcularMedia();
  
      const atualizacao = {
          nome: temposAtualizados.nome,
          tempo1: temposAtualizados.tempo1,
          tempo2: temposAtualizados.tempo2,
          tempo3: temposAtualizados.tempo3,
          tempo4: temposAtualizados.tempo4,
          tempo5: temposAtualizados.tempo5,
          media: temposAtualizados.media,
      };
        // tentar fazer update com objeto
        await Tempo.update(atualizacao, { where: { id: id } })
          .then(
            res.redirect('/tempos'))//redirecionar direto para a tela atualizada renderizando novamente
          .catch((err) => console.log())
      }
  
}