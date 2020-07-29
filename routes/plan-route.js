const router = require('express').Router();
let Plan = require('../models/plan-model');

router.route('/').get((req, res) => {
    Plan.find().then(plans => res.json(plans)).catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const name = req.body.name
    const startDate = req.body.startDate
    const user = req.body.user
    const days = req.body.days

    const newPlan = new Plan({name, startDate, user, days})

    newPlan.save().then(() => res.json(newPlan)).catch(err => res.status(400).json(err))
})

router.route('/update/:id').post((req, res) => {
    Plan.findById(req.params.id).then(plan => {
        plan.name = req.body.name
        plan.startDate = req.body.startDate
        plan.user = req.body.user
        plan.days = req.body.days

        plan.save().then(() => res.json('Plan Updated').catch(err => res.status(400).json(err)))
    }).catch(err => res.status(400).json(err))
})

router.route('/:id').delete((req, res) => {
    Plan.findByIdAndDelete(req.params.id).then(() => res.json('Plan deleted')).catch(err => res.status(400).json(err))
})



module.exports = router;