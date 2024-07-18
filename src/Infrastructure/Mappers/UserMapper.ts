import { Schema } from "mongoose";
import User from "../../Domain/Models/User.js";
import Constants from "../Constants.js";
import { DateTime } from "luxon";

const userSchema = new Schema<User>(
  {
    userName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdAt: {
      type: Date,
      required: true,
      get: (date: Date) =>
        DateTime.fromJSDate(date).toUTC().toFormat(Constants.DATE_TIME_FORMAT),
    },
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
