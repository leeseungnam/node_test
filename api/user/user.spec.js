const assert = require('assert')
const should = require('should')
const express = require('express')
const request = require('supertest')
const app = require('../../index')


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
                .expect(200)
                .end(done)
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

describe('DELETE /users/:id', () => {
    describe('성공', () => {
        it('204 응답', (done) => {
            request(app)
                .delete('/users/3')
                .expect(204)
                .end(done)
        })


    })
    describe('실패', () => {
        it('id가 숫자가 아닐 경우 400 응답', (done) => {
            request(app)
                .delete('/users/one')
                .expect(400)
                .end(done)
        })
    })

})

describe('POST /users', () => {
    describe('성공', () => {
        it('201 응답, 생성된 유저 객체를 응답', (done) => {
            request(app)
                .post('/users')
                .send({name : 'Daniel'})
                .expect(201)
                .end((err, res) => {
                    res.body.should.have.property('name', 'Daniel')
                    done();
                })
        })
    })
    describe('실패', () => {
        it('name 파라미터 누락 시 400 응답', (done) => {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done)
        })
        it('name 파라미터 중복 시 409 응답', (done) => {
            request(app)
                .post('users')
                .send({name : 'Alice'})
                .expect(409)
                .end(done)
        })
    })
})