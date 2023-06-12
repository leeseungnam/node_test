const assert = require('assert')
const should = require('should')
const express = require('express')
const request = require('supertest')
const app = require('./index')


describe('GET/users', () => {
    it('배열을 반환한다.', (done) => {
        request(app)
            .get('/users')
            .end((err, res) => {

                if(err) throw err;
                res.body.should.be.instanceOf(Array)
                res.body.forEach(user => {
                    user.should.have.property('name')
                })
                done();
            })
    })

    it('최대 limit 갯수만큼 응답한다.', (done) => {
        request(app)
            .get('/users?limit=2')
            .end((err, res) => {
                res.body.should.have.lengthOf(2)

                done()
            })
    })
})

describe('GET /users/:id', () => {
    describe('성공', () => {
        it('유저 객체를 반환한다.', done => {
            request(app)
                .get('/users/1')
                .end((err, res) => {
                    res.body.should.have.property('id', 1)
                    done()
                })
        })
    })
    describe('실패', () => {
        it('id가 숫자가 아닐경우 400 응답', (done) => {
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done)
        })
        it('찾을 수 없는 id일 경우 404 응답', (done) => {
            request(app)
                .get('/users/5')
                .expect(404)
                .end(done)
        })
    })
})