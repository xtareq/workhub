module.exports=(db,type)=>{
    return db.define('project',{
        name:type.STRING,
        type:type.STRING,
        status:type.STRING,
        endDate:type.DATEONLY
    })
}