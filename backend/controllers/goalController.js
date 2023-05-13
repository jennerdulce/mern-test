const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')

// @desc Get all goals
// @route GET /api/goals
// @access Private

const getGoals = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: 'Get goals'})
    
    const goals = await Goal.find()
    res.status(200).json(goals)
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

    // MongoDB request
    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal)

    // OLD
    // res.status(200).json({ message: 'Set goals'})
})

// @desc Update a goal
// @route PUT /api/goals/:id
// @access Private

const updateGoal = asyncHandler(async( req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedGoal)

    // OLD
    // res.status(200).json({ message: 'Updated goal'})
})

// @desc Delete a goal
// @route DELETE /api/goals/:id
// @access Private

const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    } 
    
    await Goal.findByIdAndDelete(req.params.id)

    res.status(200).json({ 
        message: 'Goal Deleted',
        id: req.params.id 
    })

    // OLD
    // res.status(200).json({ message: 'Deleted goal'})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}