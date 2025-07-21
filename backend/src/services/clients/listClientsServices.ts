import { IClientRepository } from "../../interfaces/IClient";
import ClientsRepository from "../../repositories/clients/clientsRepository";

class ListClientsServices {
  private clientsRepository: IClientRepository;
  constructor() {
    this.clientsRepository = new ClientsRepository();
  }

  public async execute(): Promise<any> {
    return await this.clientsRepository.findAll();
  }
}

export default ListClientsServices;
