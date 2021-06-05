
// 引入 mongoose

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const InfoSchema = new Schema({
  hobby: [String],
  height: String,
  weight: Number,
  studentId: ObjectId,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
});

// 建立数据模型
mongoose.model("Info", InfoSchema);