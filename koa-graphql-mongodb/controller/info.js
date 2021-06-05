
import mongoose from "mongoose";
const Info = mongoose.model("Info");

// 保存info信息
export const saveInfo = async (ctx, next) => {
  // 获取请求数据
  const opts = ctx.request.body;
  console.log('opts', opts);
  const info = new Info(opts);
  const saveInfo = await info.save(); // 保存数据
  // 判断是否保存成功 然后把数据返回给前端
  if (saveInfo) {
    ctx.body = {
      success: true,
      info: saveInfo
    };
  } else {
    ctx.body = {
      success: false
    };
  }
}

// 获取所有的info数据

export const fetchInfo = async (ctx, next) => {
  const infos = await Info.find({}); // 查询所有的数据
  // 如果有数据，就返回给前端
  if (infos.length) {
    ctx.body = {
      success: true,
      info: infos
    };
  } else {
    ctx.body = {
      success: false
    };
  }
}
