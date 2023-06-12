let users = [
    {id : 1, name : 'Alice'},
    {id : 2, name : 'Bek'},
    {id : 3, name : 'Chris'}
]

const index =  (req, res) => {
    req.query.limit = req.query.limit || 10;
    let limit = parseInt(req.query.limit, 10)

    if (Number.isNaN(limit)) {
        res.status(400).end();
    } else {
        res.json(users.slice(0, limit))
    }
}

const show = (req, res) => {
    // get id
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) {
        // res.status(400).end()
        // return
        return res.status(400).end()
    }
    // find user
    const user = users.filter(user => user.id === id)[0]

    if (!user) return res.status(404).end()
    // response
    res.json(user)
}

const remove = (req, res) => {
    const id = parseInt(req.params.id, 10)

    if(Number.isNaN(id)) return res.status(400).end()

    users = users.filter(user => user.id !== id)
    res.status(204).end();

}

const create = (req, res) => {
    const name = req.body.name

    if(!name) return res.status(400).end()

    if(users.filter(user => user.name === name).length) return res.status(409).end()

    const id = Date.now()
    const user = {id, name} //ES6 문법 변수명대로 Key 지정

    users.push(user)
    res.status(201).json(user)

}
module.exports = {
    index,
    show,
    remove,
    create
}