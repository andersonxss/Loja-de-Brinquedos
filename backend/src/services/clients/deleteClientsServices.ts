import AppError from "../../middlewares/AppError";
import ClientsRepository from "../../repositories/clients/clientsRepository";
import { IClientRepository } from "../../interfaces/IClient";

class DeleteClientsServices {
  private clientsRepository: IClientRepository;
  constructor() {
    this.clientsRepository = new ClientsRepository();
  }

  public async execute(id: string): Promise<void> {
    const user = await this.clientsRepository.findClientById(Number(id));
    if (!user) {
      throw new AppError("Cliente não encontrado", 404);
    }
    await this.clientsRepository.delete(Number(id));
  }
}

export default DeleteClientsServices;
