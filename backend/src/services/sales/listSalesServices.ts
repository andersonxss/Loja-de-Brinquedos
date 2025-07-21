import { ISalesRepository } from "../../interfaces/ISales";
import { Sale } from "../../entities/Sale";
import SalesRepository from "../../repositories/sales/salesRepository";

class ListSalesServices {
  private salesRepository: ISalesRepository;
  constructor() {
    this.salesRepository = new SalesRepository();
  }

  public async execute(): Promise<Sale[]> {
    return await this.salesRepository.findAll();
  }
}

export default ListSalesServices;
