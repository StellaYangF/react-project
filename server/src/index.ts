import express, { Express, Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
import HttpException from './exceptions/HttpException';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import errorMiddleware from './middlewares/errorMiddleware';
import * as userController from './controller/user';
import * as sliderController from './controller/slider';
import * as lessonController from './controller/lesson';
import 'dotenv/config';
import multer from 'multer';
import path from 'path';
import bodyParser from 'body-parser';
import { Slider, Lesson } from './models';

const storage = multer.diskStorage({
    destination: path.join('public', 'uploads'),
    filename(_req: Request, file:Express.Multer.File, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
})
const upload = multer({ storage });
const app: Express = express();
// middleware register
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../public/')));
// route
app.get('/user/validate', userController.validate);
app.post('/user/register', userController.register);
app.post('/user/login', userController.login);
app.post(
    '/user/uploadAvatar',
    upload.single('avatar'),
    userController.uploadAvatar,
);
app.get('/slider/list', sliderController.list);
app.get('/lesson/list', lessonController.list);
app.get('/lesson/:id', lessonController.get);
// middleware register
app.use((_req: Request, _res: Response, next: NextFunction) => {
    const error: HttpException = new HttpException(404, 'Route not found');
    next(error);
});
app.use(errorMiddleware);
const PORT: number = (process.env.PORT && parseInt(process.env.PORT))|| 8000;
(async function() {
    mongoose.set('useNewUrlParser', true),
    mongoose.set('useUnifiedTopology', true);
    await mongoose.connect(process.env.MONGO_PATH!);
    await createSliders();
    await createLessons();
    app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
})();

async function createSliders() {
  const sliders = await Slider.find();
  if (!sliders.length) {
    const sliders: any = [
      { url: 'http://img.zhufengpeixun.cn/post_reactnative.png' },
      { url: 'http://img.zhufengpeixun.cn/post_react.png' },
      { url: 'http://img.zhufengpeixun.cn/post_vue.png' },
      { url: 'http://img.zhufengpeixun.cn/post_wechat.png' },
      { url: 'http://img.zhufengpeixun.cn/post_architect.jpg' },
    ];
    Slider.create(sliders);
  };
}

async function createLessons() {
  const lessons = await Lesson.find();
  if (!lessons.length) {
    const lessons = [
      {
        order: 1,
        title: "1.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
        url: "http://img.zhufengpeixun.cn/react_url.png",
        price: "¥100.00元",
        category: "react",
      },
      {
        order: 2,
        title: "2.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
        url: "http://img.zhufengpeixun.cn/react_url.png",
        price: "¥200.00元",
        category: "react",
      },
      {
        order: 3,
        title: "3.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
        url: "http://img.zhufengpeixun.cn/react_url.png",
        price: "¥300.00元",
        category: "react",
      },
      {
        order: 4,
        title: "4.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
        url: "http://img.zhufengpeixun.cn/react_url.png",
        price: "¥400.00元",
        category: "react",
      },
      {
        order: 5,
        title: "5.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
        url: "http://img.zhufengpeixun.cn/react_url.png",
        price: "¥500.00元",
        category: "react",
      },
      {
        order: 6,
        title: "6.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/vue_poster.png",
        url: "http://img.zhufengpeixun.cn/vue_url.png",
        price: "¥100.00元",
        category: "vue",
      },
      {
        order: 7,
        title: "7.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/vue_poster.png",
        url: "http://img.zhufengpeixun.cn/vue_url.png",
        price: "¥200.00元",
        category: "vue",
      },
      {
        order: 8,
        title: "8.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/vue_poster.png",
        url: "http://img.zhufengpeixun.cn/vue_url.png",
        price: "¥300.00元",
        category: "vue",
      },
      {
        order: 9,
        title: "9.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/vue_poster.png",
        url: "http://img.zhufengpeixun.cn/vue_url.png",
        price: "¥400.00元",
        category: "vue",
      },
      {
        order: 10,
        title: "10.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/vue_poster.png",
        url: "http://img.zhufengpeixun.cn/vue_url.png",
        price: "¥500.00元",
        category: "vue",
      },
      {
        order: 11,
        title: "11.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
        url: "http://img.zhufengpeixun.cn/react_url.png",
        price: "¥600.00元",
        category: "react",
      },
      {
        order: 12,
        title: "12.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
        url: "http://img.zhufengpeixun.cn/react_url.png",
        price: "¥700.00元",
        category: "react",
      },
      {
        order: 13,
        title: "13.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
        url: "http://img.zhufengpeixun.cn/react_url.png",
        price: "¥800.00元",
        category: "react",
      },
      {
        order: 14,
        title: "14.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
        url: "http://img.zhufengpeixun.cn/react_url.png",
        price: "¥900.00元",
        category: "react",
      },
      {
        order: 15,
        title: "15.React全栈架构",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
        url: "http://img.zhufengpeixun.cn/react_url.png",
        price: "¥1000.00元",
        category: "react",
      },
      {
        order: 16,
        title: "16.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/vue_poster.png",
        url: "http://img.zhufengpeixun.cn/vue_url.png",
        price: "¥600.00元",
        category: "vue",
      },
      {
        order: 17,
        title: "17.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/vue_poster.png",
        url: "http://img.zhufengpeixun.cn/vue_url.png",
        price: "¥700.00元",
        category: "vue",
      },
      {
        order: 18,
        title: "18.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/vue_poster.png",
        url: "http://img.zhufengpeixun.cn/vue_url.png",
        price: "¥800.00元",
        category: "vue",
      },
      {
        order: 19,
        title: "19.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/vue_poster.png",
        url: "http://img.zhufengpeixun.cn/vue_url.png",
        price: "¥900.00元",
        category: "vue",
      },
      {
        order: 20,
        title: "20.Vue从入门到项目实战",
        video: "http://img.zhufengpeixun.cn/gee2.mp4",
        poster: "http://img.zhufengpeixun.cn/vue_poster.png",
        url: "http://img.zhufengpeixun.cn/vue_url.png",
        price: "¥1000.00元",
        category: "vue",
      },
    ];
    Lesson.create(lessons);
  }
}