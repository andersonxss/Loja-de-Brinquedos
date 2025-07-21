import { IClientRepository, IClientUpdate } from "../../interfaces/IClient";
import { Client } from "../../entities/Client";
import ClientsRepository from "../../repositories/clients/clientsRepository";
import AppError from "../../middlewares/AppError";

class UpdateClientsServices {
  private clientsRepository: IClientRepository;
  constructor() {
    this.clientsRepository = new ClientsRepository();
  }

  public async execute(data: IClientUpdate, id: number): Promise<Client> {
    const client = await this.clientsRepository.findClientById(id);
    if (!client) {
      throw new AppError("Cliente não encontrado", 404);
    }
    if (data.email && data.email !== client?.email) {
      const existing = await this.clientsRepository.findClientByEmail(
        data.email!
      );
      if (existing) {
        throw new AppError("Email já cadastrado", 400);
      }
    }
    client.name = data.name ?? client.name;
    client.email = data.email ?? client.email;
    client.dataNascimento = data.dataNascimento ?? client.dataNascimento;
    return await this.clientsRepository.update(client);
  }
}

export default UpdateClientsServices;
