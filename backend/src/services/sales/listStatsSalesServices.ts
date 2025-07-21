import { ISalesRepository, SalesByDay } from "../../interfaces/ISales";
import SalesRepository from "../../repositories/sales/salesRepository";

class ListStatsSalesServices {
  private salesRepository: ISalesRepository;
  constructor() {
    this.salesRepository = new SalesRepository();
  }

  public async execute(): Promise<{ salesByDay: SalesByDay[] }> {
    // Total de vendas por dia usando a nova função do repositório
    const salesByDay = await this.salesRepository.getTotalSalesByDay();

    return {
      salesByDay,
    };
  }
}

export default ListStatsSalesServices;
