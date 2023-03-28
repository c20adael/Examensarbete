const {createPool} = require('mysql')

const pool = createPool({
    host:"localhost",
    user: "root",
    password: "password",
    connectionlimit: 10
})

pool.query(`select * from testdatabase.tomtenisse`, (err, res)=>{
    if (console.log(res) == undefined) {
        return console.log(err)
    }
    else {
        return console.log(res)
    }
})