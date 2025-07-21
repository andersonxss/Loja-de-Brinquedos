import { ISalesRepository, ClientSalesStats } from "../../interfaces/ISales";
import SalesRepository from "../../repositories/sales/salesRepository";

interface SalesStats {
  clientWithHighestSales: ClientSalesStats | null;
  clientWithHighestAverage: ClientSalesStats | null;
  clientWithMostUniqueDays: ClientSalesStats | null;
}

class ListStatsClientsSalesServices {
  private salesRepository: ISalesRepository;
  constructor() {
    this.salesRepository = new SalesRepository();
  }

  public async execute(): Promise<SalesStats> {
    // Executar todas as consultas em paralelo para melhor performance
    const [
      clientWithHighestSales,
      clientWithHighestAverage,
      clientWithMostUniqueDays,
    ] = await Promise.all([
      this.salesRepository.getClientWithHighestSales(),
      this.salesRepository.getClientWithHighestAverage(),
      this.salesRepository.getClientWithMostUniqueDays(),
    ]);

    return {
      clientWithHighestSales,
      clientWithHighestAverage,
      clientWithMostUniqueDays,
    };
  }
}

export default ListStatsClientsSalesServices;
