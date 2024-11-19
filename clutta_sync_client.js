const SyncClient = require('./SyncClient');

function checkSubscription(customerId){
    //to be implemented later
    return true
}

function setupClient(customerId){
    
    if (!checkSubscription(customerId)){
      console.log("User subscription invalid")
      return
    }

    return new SyncClient(customerId)
}

module.exports ={
    setupClient
}