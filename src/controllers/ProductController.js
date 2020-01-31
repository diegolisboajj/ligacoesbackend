const mongoose = require('mongoose');

const Product = mongoose.model('Product');

module.exports = {
    async index(req, res) {
        const products = await Product.find();

        return res.json(products);
    },

    async show(req, res) {
        const product = await Product.findById(req.params.id);

        return res.json(product);
    },

    async store(req, res) {
       const product = await Product.create(req.body);
       
       return res.json(product);
    },

    async update(req, res) {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });

        return res.json(product);
    },

    async destroy(req, res) {
        await Product.findByIdAndRemove(req.params.id);

        return res.send();
    },
    
    async calculo(req, res) {
        const product = await Product.findById(req.params.id);
        const tarifa_normal = product['valor'];

        var duracao = parseFloat(req.params.tempo);
        var plano = parseFloat(req.params.plano);
        var custo_tarifa_normal = duracao * tarifa_normal;

        if (duracao > plano) 
        {
            var minutos_excedentes = duracao - plano;
            var minutos_excedentes_acrescimo = minutos_excedentes + (minutos_excedentes * 0.1);
            var custo_tarifa_fale_mais = minutos_excedentes_acrescimo * tarifa_normal;

        } else if (duracao <= plano) {

            var custo_tarifa_fale_mais = 'sem custo';

        } else {
            return res.send('Nenhum Plano foi selecionado');
        }

        var detalhes = {
            'plano-comum': {
                'origem': product['origem'],
                'destino': product['destino'],
                'custo': custo_tarifa_normal
            },
            'plano-fale-mais': {
                'origem': product['origem'],
                'destino': product['destino'],
                'custo': custo_tarifa_fale_mais
            },
        }

        return res.json(detalhes);
    }
}