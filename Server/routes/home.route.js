import express from 'express'
import homeCtrl from '../controllers/home.controller.js'
const router = express.Router()

router.get('/', getHome)

function getHome(req, res) {
    homeCtrl.getHomeProduct().then((result) => {
        res.json(result)
    }).catch((err) => {
        res.status(402).json(err)
    })
}


export default router