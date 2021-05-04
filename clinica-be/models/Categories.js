const conexao = require('../database');

class Categories{

    async findAll(){
       
        try {
            var result = await conexao.select().table("categories");
            if (result.length > 0){
                return result;
            }else{
                return undefined;
            }
            
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async findById(id){
        try {
            var result = await conexao.select().where({idcategorie:id}).table("categories");
            return result[0];
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async Create(description){
        try{
            await conexao.insert({description}).table("categories");
            }
            catch(err){
                console.log(err);
            }
    }

    async update(id,description){

        var categorie = await this.findById(id);

        if(categorie != undefined){

            var editCategorie = {};

            if(description != undefined|| description  == '' || description  ==' '){
                editCategorie.description = description;
            }

            try {
                await conexao.update(editCategorie).where({idcategorie:id}).table("categories");
                return {status: true};
            } catch (error) {
                console.log(error);
                return {status: false,err: error};
            }
            
        }else{
            return {status: false,err:"A categoria não existe!" }
        }

    }

    async delete(id){
        var user = await this.findById(id);  
        if(user != undefined){
             try {
                 await conexao.delete().where({idcategorie:id}).table("categories");
                 return {status:true};
             } catch (error) {
                 return{status: false,err:error}
             }
        }else{
            return{status: false,err:"A categoria não existe"}
        }
     }

}

module.exports = new Categories;