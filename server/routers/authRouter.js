const { Router } = require('express')
const router = Router()
const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.get('/',
    async (req, res) => {
        const user = await User.find()
        res.status(200).send(user)
    }
)

router.post('/reg',
    [
        check('email', 'Incorrect email').isEmail()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect registration data!'
                })
            }

            const { name, email, password, date, status, isChecked } = req.body

            const isUsed = await User.findOne({ email })

            if (isUsed) {
                return res.status(300).json({ message: 'Email busy.' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const dateReg = new Date().toLocaleDateString()

            const user = new User({
                name, email, password: hashedPassword, date: dateReg, status: false, isChecked: false
            })

            await user.save()

            res.status(201).json({ message: 'User created.' })

        } catch (err) {
            console.log(err)
        }
    })

router.post('/login',
    async (req, res) => {
        const user = await User.findOne({
            email: req.body.email,
            userStatus: req.body.status
        })

        if (!user) {
            return { status: 'error', error: 'Invalid login' }
        }

        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            user.password
        )

        if (isPasswordValid) {
            const token = jwt.sign(
                {
                    userId: user.id,
                    email: user.email,
                    userStatus: user.status
                },
                'secret123'
            )

            return res.json({ status: 'ok', token, userStatus: user.status, email: user.email })
        } else {
            return res.json({ status: 'error', user: false })
        }
    })

router.delete('/:id',
    async (req, res) => {
        const user = await User.findByIdAndDelete(req.params.id)
        
        res.status(200).send(user)

    })

router.put('/:id',
    async (req, res) => {    
        const user = await User.findById(req.params.id)

        if (user.status === false) {
            user.status = true 
        } else {
            user.status = false
        }

        await user.save()
        res.status(200).send(user)
    })

module.exports = router