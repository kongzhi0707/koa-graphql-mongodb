
const { gql } = require('apollo-server-koa');
const mongoose = require('mongoose');

const InfoModel = mongoose.model('Info');
const StudentModel = mongoose.model('Student');

const typeDefs = gql`
  type Info {
    height: String
    weight: String
    hobby: [String],
    studentId: ID,
    _id: ID
  }
  type Student {
    name: String,
    sex: String,
    age: Int,
    _id: ID,
    info: Info
  }
  type Query {
    getStudent: [Student]
    getStudentInfo(id: ID): Info
    getInfo: [Info]
  }
  type Mutation {
    addStudent(post: StudentInput): Student
    addStudentInfo(id: ID, height: String, weight: String, hobby: [String]): Info
    changeStudentInfo(id: ID, height: String, weight: String, hobby: [String]): Info
  }
  input StudentInput {
    name: String
    sex: String
    age: Int
  }
`

const resolvers = {
  Query: {
    getStudent: (parent, args, context, info) => {
      return StudentModel.find({});
    },
    getStudentInfo: async (parent, args, context, info) => {
      const ret = await InfoModel.find({studentId: args.id});
      return ret[0];
    },
    getInfo: (parent, args, context, info) => {
      return InfoModel.find({});
    }
  },
  Mutation: {
    addStudent: (parent, args, context) => {
      const { name, sex, age } = args.post;
      return StudentModel.create({ name, sex, age });
    },
    addStudentInfo: (parent, args, context) => {
      const { id, height, weight, hobby } = args;
      return InfoModel.create({ hobby, height, weight, studentId: id });
    },
    changeStudentInfo: (parent, args, context) => {
      const { id, height, weight, hobby } = args;
      return InfoModel.findOneAndUpdate({ studentId: id }, { height, weight, hobby });
    }
  }
};

module.exports = {
  resolvers,
  typeDefs
};

