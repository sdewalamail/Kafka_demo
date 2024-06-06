const { kafka } = require("./client");

async function init() {
    const consumer = kafka.consumer({ groupId: "user-1" })
    await consumer.connect();

    console.log("Consumer connected successfully...");

    await consumer.subscribe({ topics: ["rider-updates"], fromBeginning: true });


    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            console.log({
                key: message.key.toString(),
                value: message.value.toString(),
                headers: message.headers,
            })
        },
    })
    
    // await consumer.disconnect();
}

init()