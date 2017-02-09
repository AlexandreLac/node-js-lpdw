const router = require('express').Router();
const SongService = require('../services/songs');


router.post('/', (req, res) => {
  return SongService.create(req.body)
    .then(song => {
       res.status(201).send(song);
    })
    .catch(err => {
       res.status(500).send(err);
    })
  ; 
});

router.get('/', (req, res) => {
  SongService.find(req.query)
    .then(songs => {
      res.status(200).send(songs);
    });
});

router.get('/:id', (req, res) => {
  // req.query = {id: req.params.id};
  // SongService.find(req.query)
  //   .then(songs => {
  //     res.status(200).send(songs);
  //   });
  if (!req.accepts('text/html') && !req.accepts('application/json')) {
    return res.status(406).send({err: 'Not valid type for asked resource'});
  }
  SongService.find({id: req.params.id})
    .then(song => {
      if (!song) {
        return res.status(404).send({err: `id ${req.params.id} not found`});
      }
      if (req.accepts('text/html')) {
        return res.render('song', {song: song});
      }
      if (req.accepts('application/json')) {
        return res.status(200).send(song);
      }
    })
  ;
});

router.put('/:id', (req, res) => {
  return SongService.update(req.params.id,req.body)
    .then(song => {
      res.status(201).send(song);
    })
    .catch(err => {
      res.status(500).send(err);
    })
  ;
});

router.delete('/', (req, res) => {
  return SongService.deleteAll()
    .then(() => {
      res.status(254).send('All Songs Destroy');
    })
    .catch(err => {
      res.status(500).send(err);
    })
  ;
});

router.delete('/:id', (req, res) => {
  return SongService.delete(req.params.id)
    .then(() => {
      res.status(254).send('Songs Destroy');
    })
    .catch(err => {
      res.status(500).send(err);
    })
  ;
});

module.exports = router;