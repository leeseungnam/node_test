const express = require('express')
const logger = require('morgan')
const {request} = require("express");
const bodyParser = require('body-parser')

const app = express();

const user = require('./api/user/index')

// 미들웨어 추가하는 부분
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))

// user 라우팅 설정
app.use('/users', user)

module.exports = app
