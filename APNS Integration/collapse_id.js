const crypto = require('crypto');
function get_collapseId(device_token,message)
{
    console.log(`device token:${device_token} message:${message}`);
	var hashPwd = crypto.createHash('sha256').update(device_token+message).digest('hex'); 
	console.log(`Unique collapse id:${hashPwd}`);
}

get_collapseId("token123","Neha")
get_collapseId("token123","Rimika");
