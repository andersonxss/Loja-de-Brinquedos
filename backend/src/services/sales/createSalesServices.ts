import { ISalesCreate, ISalesRepository } from "../../interfaces/ISales";
import { Sale } from "../../entities/Sale";
import SalesRepository from "../../repositories/sales/salesRepository";

class CreateSalesServices {
  private salesRepository: ISalesRepository;
  constructor() {
    this.salesRepository = new SalesRepository();
  }

  public async execute(data: ISalesCreate): Promise<Sale> {
    return await this.salesRepository.create(data);
  }
}

export default CreateSalesServices;
