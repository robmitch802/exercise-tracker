const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const type = req.body.type;
    const description = req.body.description;
    const duration_sec = Number(req.body.duration_sec);
    const duration_min = Number(req.body.duration_min);
    const duration_hours = Number(req.body.duration_hours);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        type,
        description,
        duration_sec,
        duration_min,
        duration_hours,
        date,
    });

    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
})
router.route('/exercise_page/:id').get((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.type = req.body.type;
        exercise.description = req.body.description;
        exercise.duration_sec = Number(req.body.duration_sec);
        exercise.duration_min = Number(req.body.duration_min);
        exercise.duration_hours = Number(req.body.duration_hours);
        exercise.date = Date.parse(req.body.date);

        exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: '+ err))
    })
})

module.exports = router;