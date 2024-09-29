import express, { json } from 'express';
import cors from 'cors';
import blogRouter from ('./Route/BlogRoute')
require('./db')

const app = express();
app.use(cors())
app.use(json())

app.use('/api',(req,res) =>
{
    res.send('Hello World');
})

app.use('/api/blogs', blogRouter)

app.listen(5000, () => console.log(`App is running at 5000`))