
// 引入模块
import Koa from 'koa';
import KoaStatic from 'koa-static';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
const { ApolloServer } = require('apollo-server-koa');
require('./mongodb');

const { typeDefs, resolvers } = require('./graphql/schema')
const apollo = new ApolloServer({ typeDefs, resolvers })

// 引入数据库
import { database } from './mongodb';
database();

// 引入路由
const routerMap = require('./router');

const app = new Koa();
const router = new Router();

// 使用 bodyParser 和 koaStatic 中间件

app.use(bodyParser());
app.use(KoaStatic(__dirname + '/public'));

/**
 * app.use(router.routes()) 将路由注册到app对象上面 这样就可以让router帮我们处理url和处理函数之间的映射
 * 处理post请求的时候，koa无法解析http请求体中的数据，因此我们需要引入 koa-bodyparser
 * app.use(router.allowedMethods()) 处理status为空或者404情况的404情况的
 */
app
  .use(router.routes())
  .use(router.allowedMethods());

// 使用路由
router.use(routerMap.routes());

// 使用 apollo
app.use(apollo.getMiddleware());

app.listen(4000, () => {
  console.log('graphQL server listen port: ' + 4000);
  console.log(`Server ready at http://localhost:4000${apollo.graphqlPath}`)
});


