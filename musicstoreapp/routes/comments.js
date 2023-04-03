const {ObjectId} = require("mongodb");

module.exports = function (app, commentsRepository) {
    app.post('/comments/:song_id', function (req, res) {
        if (req.session.user == null) {
            res.send("Tienes que estar autenticado para realizar un comentario");
        } else {
            let comment = {
                author: req.session.user,
                text: req.body.text,
                song_id: ObjectId(req.params.song_id)
            }
            if (comment.text.trim() != "") {
                commentsRepository.insertComment(comment, function (commentId) {
                    if (commentId != null) {
                        res.redirect('/songs/' + comment.song_id);
                    } else {
                        res.send("Se ha producido un error al insertar el comentario");
                    }
                });
            } else {
                res.redirect("/comments/:song_id?message=No se puede enviar un comentario vacío.&messageType=alert-danger");
            }
        }
    });
}