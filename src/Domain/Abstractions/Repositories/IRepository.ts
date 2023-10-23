import BaseModel from "../../Models/Abstractions/BaseModel.js";

interface IRepository<T extends BaseModel> {
  findByIdAsync(id: string, signal: AbortSignal): Promise<T | null | undefined>;
}

export default IRepository;
