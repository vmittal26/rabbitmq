import express , {Request , Response} from 'express';
import {Producer} from './Producer';
import {json} from 'body-parser';

const app = express();
app.use(json());
const producer = new Producer();

app.post('/sendLog', async(req:Request, res:Response)=>{

    await producer.publishMessage(req.body.type, req.body.message);

    res.send({message:"success "}).status(200);
})


app.listen('5000', () => {
    console.log(`Listening on port ${'5000'}`);
  });