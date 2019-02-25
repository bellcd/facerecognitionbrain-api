const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'd158d6c4f2a3405db0e31a24ac6bf60d'
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json("unable to fetch from Clarifai API"))
}


const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment("entries", 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json("unable to get entries"));
}

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall
}
