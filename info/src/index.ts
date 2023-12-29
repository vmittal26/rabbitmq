import amqp, {ConsumeMessage } from "amqplib";


export const consumeMessage = async()=>{
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertExchange("logExchange","direct");

    const queueInstance = await channel.assertQueue("InfoQueue");

    await channel.bindQueue(queueInstance.queue , "logExchange", "info");

    channel.consume(queueInstance.queue, (message:ConsumeMessage | null)=>{

        if(message!=null && message.content!=null ){
            const messageObject = JSON.parse(message?.content.toString());
            console.log({messageObject});
            channel.ack(message);
        }else{
            console.log('Message is not valid!');
        }
       
    });

}

consumeMessage();