const asyncHandler = require('express-async-handler')

// @desc Get all goals
// @route GET /api/goals
// @access Private

const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get goals'})
})

// @desc Set a goal
// @route POST /api/goals
// @access Private

const setGoal = asyncHandler(async (req, res) => {
    // This example does not utilize middleware
    // if(!req.body.text){
    //     res.status(400).json({ message: 'please add text property to body' })
    // }

    // Proper method with middleware
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add text field') // Utilizes new error middleware created
    }

    res.status(200).json({ message: 'Set goals'})
})

// @desc Update a goal
// @route PUT /api/goals/:id
// @access Private

const updateGoal = asyncHandler(async( req, res) => {
    res.status(200).json({ message: `Update goal ${req.params.id}`})
})

// @desc Delete a goal
// @route DELETE /api/goals/:id
// @access Private

const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete goal ${req.params.id}`})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}