const Categories = require('../models/Categories')

class CategoriesC{
    async list(req, res){
        
        var categories = await Categories.findAll();
        res.json(categories);
    }
    async findUCategorie(req,res){
        var id =req.params.id;
        var categorie = await Categories.findById(id);
        if(categorie == undefined){
            res.status(404);
            res.json({});
        }else{
            res.json(categorie);
        }
    }
    async new (req,res){
        var description = req.body.description;
        if(description == undefined || description == '' || description ==' '){
            res.status(400);
            res.json({err:"A descrição é invalida!"});
            return;
        }
        else{
            Categories.Create(description);;
            res.status = 200;
            res.send("Tudo ok")
        }
    }
    async edit(req,res){
        var{id,description} = req.body;
        var result = await Categories.update(id,description);
        if(result!= undefined){
            if(result.status){
                res.status(200);
                res.send("Tudo ok");
            }else{
                res.status(406);
                res.send(result.err);
            }
        }else{
            res.status(406);
            res.send("Deu erro"); 
        }
        
    }
    async remove(req,res){
        var id = req.params.id;
        var result = await Categories.delete(id);

        if(result.status){
            res.status(200);
            res.send("Tudo ok");
        }else{
            res.status(406);
            res.send(result.err);
        }
    }
}

module.exports = new CategoriesC;