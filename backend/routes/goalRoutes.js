const express = require('express')
const router = express.Router()
const { getGoals, setGoal, updateGoal, deleteGoal, getAllGoals } = require('../controllers/goalController')
const { protect } = require('../middleware/authMiddleware')

// Old version before importing functions from controller
// router.get('/', (req, res) => {
//     res.status(200).json({message: 'Get goals'})
// })

// Can consolidate if you want
// pretty much saying, for this route, for get use this controller, for post use this controller
// router.route('/').get(getGoals).post(setGoal)
// router.route('/:id').put(updateGoal).delete(deleteGoal)


router.get('/', protect, getGoals)
router.post('/', protect, setGoal)
router.put('/:id', protect, updateGoal)
router.delete('/:id', protect, deleteGoal)
router.get('/all', getAllGoals)

module.exports = router