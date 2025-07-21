import { IClientCreate, IClientRepository } from "../../interfaces/IClient";
import { Client } from "../../entities/Client";
import ClientsRepository from "../../repositories/clients/clientsRepository";
import AppError from "../../middlewares/AppError";

class CreateClientsServices {
  private clientsRepository: IClientRepository;
  constructor() {
    this.clientsRepository = new ClientsRepository();
  }

  public async execute(data: IClientCreate): Promise<Client> {
    const client = await this.clientsRepository.findClientByEmail(data.email);
    if (client) {
      throw new AppError("E-mail já cadastrado");
    }
    return await this.clientsRepository.create(data);
  }
}

export default CreateClientsServices;
