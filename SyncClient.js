const { v4: uuidv4 } = require('uuid');

class SyncClient{
    constructor(customerId){
        this.customerId=customerId
    }

    //pulse status can be success = 1, failure = 2, unknown = 0
    async sendPulse(chainId,signatureId,correlationId,sourceId,status,statusDescription){
        var pulseStatus;
        if (status==="SUCCESS"){
            pulseStatus=1
        } else if (status==="FAILURE"){
            pulseStatus=2
        } else {
            pulseStatus=0
        }

        const pulse={
            uuid: uuidv4(),
            chainId: chainId,
            signatureId: signatureId,
            correlationId: correlationId,
            sourceId: sourceId,
            pulseStatus: pulseStatus,
            statusDescription: statusDescription,
            createdAt: new Date().toISOString(),
            userId: this.customerId
        }
        console.log(pulse)

        try {
            const response = await fetch("https://api.clutta.io/v1/sync/send-pulse", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(pulse),
            });
        
            if (response.ok) {
                const data = await response.text();
                console.log("Pulse sent successfully")
                console.log('Server Response:', data);
            } else {
                const data = await response.text();
                console.error('Server Error:', response.status);
                console.log('Server Response:', data);
            }
        } 
        catch (error) {
            console.error('Error sending pulse:', error);
        }
    }

}

module.exports = SyncClient;