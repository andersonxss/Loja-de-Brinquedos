import { Repository, ILike } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/Client";
import {
  IClientCreate,
  PaginationOptions,
  IClientUpdate,
  PaginatedResult,
} from "../../interfaces/IClient";

class ClientsRepository {
  private clientsRepository: Repository<Client>;

  constructor() {
    this.clientsRepository = AppDataSource.getRepository(Client);
  }

  public async create(data: IClientCreate): Promise<Client> {
    const sales = this.clientsRepository.create(data);
    return await this.clientsRepository.save(sales);
  }

  public async update(data: IClientUpdate): Promise<Client> {
    return await this.clientsRepository.save(data);
  }

  public async delete(id: number): Promise<void> {
    await this.clientsRepository.delete(id);
  }

  public async findClientByEmail(email: string): Promise<Client | null> {
    return await this.clientsRepository.findOneBy({ email });
  }

  public async findClientById(id: number): Promise<Client | null> {
    return await this.clientsRepository.findOneBy({ id });
  }

  public async findAllPaginated(
    options: PaginationOptions = {}
  ): Promise<PaginatedResult> {
    const { page = 1, limit = 10, search } = options;
    const skip = (page - 1) * limit;

    const queryBuilder = this.clientsRepository.createQueryBuilder("client");

    // Aplicar filtros baseado no parâmetro search
    if (search !== undefined || search !== "") {
      // Verifica se o search é um email (contém @)
      if (search?.includes("@")) {
        queryBuilder.where("client.email ILIKE :search", {
          search: `%${search}%`,
        });
      } else {
        queryBuilder.where("client.name ILIKE :search", {
          search: `%${search}%`,
        });
      }
    }

    // Contar total de registros
    const total = await queryBuilder.getCount();

    // Buscar dados paginados
    const data = await queryBuilder
      .skip(skip)
      .take(limit)
      .orderBy("client.name", "ASC")
      .getMany();

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
  }

  public async findAll(): Promise<Client[]> {
    return await this.clientsRepository.find();
  }
}

export default ClientsRepository;
