const {nanoid} = require("nanoid");
const URL = require('../models/url')
async function handleGenerateNewShortURL(req , res){
    const shortID = nanoid(8);
    const body = req.body;
    // console.log(shortID);

    if(!body.url) return  res.status(400).json({error : 'url is required'});

    await URL.create({
        shortId : shortID,
        redirectURL : body.url,
<<<<<<< HEAD
        visitHistory : [],
        createdBy: req.user._id,
   });

    return res.render('home',{id : shortID})
=======
        visitHistory : []
   });

>>>>>>> 58f3b16b5e9870505d51498f2b73262de8cade6c
    return res.json({id : shortID})
}

async function handleGetAnalytics(req , res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId : shortId })
    return res.json({ 
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    })
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
}