import { set, connect } from 'mongoose';
set('strictQuery',false);

connect("mongodb+srv://sangammukherjee2022:sangammukherjee2023@cluster0.uulyk4o.mongodb.net/")
.then(() =>console.log('Connected mongo db'))
.catch((e) => console.log(e))