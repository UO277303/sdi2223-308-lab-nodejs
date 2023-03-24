module.exports = function (app, twig) {
    app.get('/authors/add', function (req, res) {
        res.render('authors/add.twig');
    });

    app.post('/authors/add', function(req, res) {
        let response = "Autor: ";
        if (!req.body.nombre || req.body.nombre.trim() == "") {
            response += "No enviado con la petición";
        } else {
            response += req.body.nombre;
        }
        response += "<br>Grupo: ";
        if (!req.body.grupo || req.body.grupo.trim() == "") {
            response += "No enviado con la petición";
        } else {
            response += req.body.grupo;
        }
        response += "<br>Rol: ";
        if (!req.body.role || req.body.role.trim() == "") {
            response += "No enviado con la petición";
        } else {
            response += req.body.role;
        }
        res.send(response);
    });

    app.get("/authors", function (req, res) {
        let authors = [{
            "nombre": "Taylor Swift",
            "grupo": "No group",
            "role": "Cantante"
        }, {
            "nombre": "Melendi",
            "grupo": "No group",
            "role": "Cantante"
        }, {
            "nombre": "Pedro",
            "grupo": "Grupo 1",
            "role": "Guitarrista"
        }];
        let response = {
            lista: 'Lista de autores',
            authors: authors
        };
        res.render("authors/authors.twig", response);
    });

    app.get("/authors/*", function (req, res) {
        res.redirect("/authors");
    });
}