module.exports=(db,type)=>{
    return db.define('task',{
        name:type.STRING,
        status:type.STRING,
        endAt:type.DATE
    })
}