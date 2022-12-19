// imports
const translatte = require('translatte');
const bodyParser = require("body-parser");
var express = require('express')
var app = express()
var cors = require('cors')

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

// variables
const port = 3000;

//routes
app.post("/translate", (req,res) => {
    const text = req.body.text;
    var response = {}
    translatte(text, {to: 'en'}).then(translation => {
        response = {translation: translation.text}
        res.status(200);
        res.json(response)
    }).catch(err => {
        console.error(err);
        res.status(400)
        res.send("Error Translating")
    });
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

// const getTweets = async () => {
//     let tweets = []
//     const res = await axios.get("https://api.twitter.com/2/users/108543358/tweets", {
//         headers: {
//             Authorization: "Bearer AAAAAAAAAAAAAAAAAAAAADJ0kAEAAAAAogpT2CnVuT1qPKaTpz7y1C1T0Xo%3DNcVNoCwmBGnxdA8RWfP9nTgnTTGWB94llN8gFebL0p8rD68tSh"
//         }
//     })
//     res.data.data.forEach(tweet => {
//         tweets = [...tweet]
//     })
//     console.log(tweets)
// }

// getTweets()