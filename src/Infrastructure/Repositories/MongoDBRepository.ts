import { inject, injectable } from "inversify";
import IRepository from "../../Domain/Abstractions/Repositories/IRepository.js";
import BaseModel from "../../Domain/Models/Abstractions/BaseModel.js";
import mongoose from "mongoose";

@injectable()
class MongoDBRepository<T extends BaseModel> implements IRepository<T> {
  private _context?: mongoose.Model<T>;

  constructor(
    @inject("Connection") connection: mongoose.Connection,
    name: string,
    schema: mongoose.Schema<T>
  ) {
    this._context = connection.model<T>(name, schema);
  }

  async findByIdAsync(id: string): Promise<T | null | undefined> {
    return await this._context?.findById<T>(id).exec();
  }
}

export default MongoDBRepository;
