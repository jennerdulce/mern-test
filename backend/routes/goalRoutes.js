const express = require('express')
const router = express.Router()
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController')

// Old version before importing functions from controller
// router.get('/', (req, res) => {
//     res.status(200).json({message: 'Get goals'})
// })

// Can consolidate if you want
// pretty much saying, for this route, for get use this controller, for post use this controller
// router.route('/').get(getGoals).post(setGoal)
// router.route('/:id').put(updateGoal).delete(deleteGoal)

router.get('/', getGoals)
router.post('/', setGoal)
router.put('/:id', updateGoal)
router.delete('/:id', deleteGoal)

module.exports = router