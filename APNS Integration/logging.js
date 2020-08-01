var mongoose=require('mongoose');
mongoose.Promise=global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/Notification_logs');

var notification_schema=mongoose.model('logs_details',
{
    apns_id:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    device_token:{
        type:String,
        required:true
    },
    status_code:{
        type:Number,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        expires:'31536000',
        default:Date.now()
    },
});


function store(device_token,message,apns_id)
{
    var new_notification=new notification_schema(
        {
           apns_id:apns_id,
           message:message,
           status_code:200,
           device_token:device_token,
           date:Date(Date.now()).toString(),
        }
    )
    
    new_notification.save()
    .then(()=> { console.log("Log created successfully");
    })
    .catch((error)=>{
        console.log("Error in inserting Record in Notification_Sent database");
    })

}

store("token123","Hello user!","123@user");

module.exports={store};
