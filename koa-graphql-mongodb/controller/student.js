
import mongoose from 'mongoose';
const Student = mongoose.model('Student');

// 保存学生数据的方法
export const saveStudent = async (ctx, next) => {
  // 获取前端请求的数据
  const opts = ctx.request.body;
  const student = new Student(opts);
  // 保存数据
  const saveStudent = await student.save();
  if (saveStudent) {
    ctx.body = {
      success: true,
      student: saveStudent
    };
  } else {
    ctx.body = {
      success: false
    };
  }
}

// 查询所有学生的数据
export const fetchStudent = async (ctx, next) => {
  const students = await Student.find({});
  if (students.length) {
    ctx.body = {
      success: true,
      student: students
    };
  } else {
    ctx.body = {
      success: false
    };
  }
}

// 查询学生的数据以及附加数据  连表查询
export const fetchStudentDetail = async (ctx, next) => {
  /**
   * 利用populate来查询关联info的数据
   * 更多populate知识请查看： https://itbilu.com/nodejs/npm/HkAKMTECm.html
   */
  const students = await Student.find({}).populate({
    path: 'info',
    select: 'hobby height weight'
  }).exec()
  if (students.length) {
    ctx.body = {
      success: true,
      student: students
    };
  } else {
    ctx.body = {
      success: false
    };
  }
}