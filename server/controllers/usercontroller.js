import express from 'express'


export const dashboard = (req,res)=>{
res.json({
    message:`Welcome ${req.user.name}! This is your dashboard`,
    user: req.user
})
}