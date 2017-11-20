module.exports.handleDBError=function(err){
    if(err){
        console.log('Error connecting to database. Error message  : ',err );
    }else{
        console.log('Successfully connected to database! '+dbConfig.uri);
    }
}