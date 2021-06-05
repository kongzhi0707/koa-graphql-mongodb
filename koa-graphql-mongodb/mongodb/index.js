
// 引入 mongoose 模块

import mongoose from "mongoose";
import config from "../config";

// 加载基本信息表 和 学生表

require('./schema/info');
require('./schema/student');

// 连接mongodb

export const database = () => {
  mongoose.set('debug', true);

  mongoose.connect(config.dbPath, 
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  );

  // 数据库断开的时候 重新连接数据库
  mongoose.connection.on('disconnected', () => {
    mongoose.connect(config.dbPath, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
  });
  mongoose.connection.on("error", err => {
    console.log('err', err);
  });
  mongoose.connection.on("open",  () => {
    console.log("Connection to MongoDB")
  });
  /* 链接成功 */
  mongoose.connection.on('connected', function() {
    console.log('Mongoose connection open to ' + config.dbPath);
  });
}