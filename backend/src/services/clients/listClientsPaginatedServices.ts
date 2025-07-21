import {
  PaginationOptions,
  IClientRepository,
  PaginatedResult,
} from "../../interfaces/IClient";
import ClientsRepository from "../../repositories/clients/clientsRepository";

class ListClientsPaginatedServices {
  private clientsRepository: IClientRepository;
  constructor() {
    this.clientsRepository = new ClientsRepository();
  }

  public async execute({
    page,
    limit,
    search,
  }: PaginationOptions): Promise<PaginatedResult | null> {
    return await this.clientsRepository.findAllPaginated({
      page,
      limit,
      search,
    });
  }
}

export default ListClientsPaginatedServices;
