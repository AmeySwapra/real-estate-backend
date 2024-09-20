import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRoute from './routes/auth.route.js'
import testRoute from './routes/test.route.js'
import postRoute from './routes/post.route.js'
import userRoute from './routes/user.route.js'
const app = express();

console.log("testing the server in good enviroment")





app.use(cors({
  origin: function (origin, callback) {
    // Allow requests from http://localhost:3000 and http://localhost:3001
    if (!origin || ['http://localhost:3000', 'http://localhost:3001'].indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
  
app.use(express.json())
app.use(cookieParser());

app.use('/api/auth', authRoute)
app.use('/api/test', testRoute)
app.use("/api/posts", postRoute)
app.use("/api/users", userRoute);

app.listen(8080, () => {
    console.log('Server is Running fine');
});