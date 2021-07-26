const {getExercise} = require('../../data');

module.exports = (req, res) =>{
    res.status(200).json({data: getExercise(req.params.slug)});
}
