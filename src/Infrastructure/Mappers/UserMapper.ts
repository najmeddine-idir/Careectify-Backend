import { Schema } from "mongoose";
import User from "../../Domain/Models/User.js";
import Constants from "../Constants.js";

const userSchema = new Schema<User>(
  {
    userName: { type: String, required: true },
  },
  {
    id: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  }
);

export default { name: Constants.USER_COLLECTION_NAME, schema: userSchema };
