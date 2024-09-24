import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoute from './routes/auth.route.js';
import testRoute from './routes/test.route.js';
import postRoute from './routes/post.route.js';
import userRoute from './routes/user.route.js';
import messageRoute from './routes/message.route.js'
const app = express();

console.log("Testing the server in a good environment");

const corsOptions = {
  origin: ['https://justhomes.netlify.app', 'http://localhost:3000', 'http://localhost:3001', 'https://justhome-adminpanel.netlify.app'], 
  credentials: true,
  optionsSuccessStatus: 200,
};



app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/test', testRoute);
app.use('/api/posts', postRoute);
app.use('/api/users', userRoute);
app.use('/api/messages', messageRoute);


app.listen(8080, () => {
  console.log('Server is running fine');
});
