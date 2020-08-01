var jwt=require('jsonwebtoken');
var cert=fs.readFileSync('signingkey.pm');
function token_generator(keyID,teamID)
{
    var header={
        keyID:keyID,
        algorithm:'ES256'
       }
    var data={
        iss:teamID
       };
    var token=jwt.sign(data,cert,{expiresIn:60*60,header:header,noTimestamp:false},function(error,token)
    {
        if(error)
         console.log("Error in creating JWT");
    }
    );
    return token;
}

module.exports={token_generator};
