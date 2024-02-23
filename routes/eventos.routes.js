const router = require("express").Router();
const Event = require("./../models/Event.models");

//trae todos los eventos
router.get("/getAllEvents", (req, res) => {
  Event.find()
    .select("name image date")
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err));
});

//muestra lo datos de un solo evento
router.get("/getOneEvent/:id", (req, res, next) => {
  const { id } = req.params;

  Event.findById(id)
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err));
});

//Guarda un evento

router.post("/saveEvento", (req, res) => {
  const { name, image, location, description } = req.body;

  Event.create({ name, image, location, description })
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err));
});

//Elimina evento
router.delete("/deleteEvento/:id", (req, res) => {
  const { id } = req.params;

  Event.findByIdAndDelete(id)
    .then((response) => {
      if (!response) {
        // No se encontró el evento con ese ID
        return res.status(404).json({ message: "Evento no encontrado" });
      }

      res.json({ message: "Evento eliminado exitosamente" });
    })
    .catch((err) => res.status(500).json(err));
});
module.exports = router;
