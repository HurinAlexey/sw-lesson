const express = require('express')
const webpush = require('web-push')
const bodyParser = require('body-parser')
const corsMiddleware = require('./middleware/cors')

const app = express()

app.use(bodyParser.json())
app.use(corsMiddleware)

const vapidSettings = {
    subject : 'mailto: <test@test.com>',
    publicKey : 'BBylzpJbeexgDvm7xlclV_ffBfou-TGThy4WKqM7t7DzfApf2XfbulNmNGGTirGo8VMJkpoLKX3eB6Xzj-H8x0g',
    privateKey : 'f16CZe9DY6euUrxDr-RNTAys_vRiyJH49v2-SsQtW8c'
}

webpush.setVapidDetails(vapidSettings.subject, vapidSettings.publicKey, vapidSettings.privateKey)

const subscriptionsLimit = 50
let pushSubscriptions = []

app.post('/api/subscribe', (req, res) => {
    const subscription = req.body

    const isSubscribed = pushSubscriptions.find(item => JSON.stringify(item) === JSON.stringify(subscription))

    if (isSubscribed) {
        return res.json({})
    }

    if (subscriptionsLimit <= pushSubscriptions.length) {
        pushSubscriptions = pushSubscriptions.slice(1)
    }

    pushSubscriptions.push(subscription)

    res.status(201).json({})

    const payload = JSON.stringify({ title: 'Welcome!', body: 'You successfully subscribed!' })
    webpush.sendNotification(subscription, payload).catch(console.log)
})

app.post('/api/mass-push', (req, res) => {
    res.status(200).json({})

    for (const subscription of pushSubscriptions) {
        const payload = JSON.stringify({ title: req.body.title, body: req.body.text })
        webpush.sendNotification(subscription, payload).catch(console.log)
    }
})

const postsLimit = 50
let posts = []

app.post('/api/posts/create', (req, res) => {
    const newPost = {
        title: req.body.title,
        text: req.body.text,
        date: new Date()
    }
    
    if (postsLimit <= posts.length) {
        posts = posts.slice(1)
    }

    posts.push(newPost)

    res.json(newPost)
})

app.get('/api/posts', (req, res) => {
    const sortedPosts = [...posts].sort((a, b) => b.date.getTime() - a.date.getTime())

    res.json(sortedPosts)
})

const PORT = 5001

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT)
})
