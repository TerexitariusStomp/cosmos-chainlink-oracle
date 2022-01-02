const express = require('express')
const { json, request } = require('express')
const app = express()
const port = process.env.PORT || 3000
const createRequest = require('./index').createRequest
const api = require('./services/api').API
require('dotenv').config()

app.use(json())
app.post('/', async(req, res) => {
    req.body["data"] = JSON.parse(req.body["data"]);
    req.body.data.data = JSON.parse(req.body.data.data);

    createRequest(req.body, async(status, result) =>  {

        console.log('REQ Body', req.body)

        if (status == 200) {

            // const quote = result.data[0].q
            // const author = result.data[0].a
            // const text = `${quote} - ${author}`

            const requester = req.body.data.requester
                //console.log(req.body.data)
            console.log(result.result)
            api.main.signAndBroadcast(process.env.ORACLE_ADDRESS, requester, result.result)
        }



        res.status(status).json(result)

    })
})

app.listen(port, () =>  console.log(`Listening on port ${port}`))