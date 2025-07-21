import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Sale } from "../../entities/Sale";
import {
  ISalesCreate,
  SalesByDay,
  ClientSalesStats,
} from "../../interfaces/ISales";

class SalesRepository {
  private salesRepository: Repository<Sale>;

  constructor() {
    this.salesRepository = AppDataSource.getRepository(Sale);
  }

  public async create(data: ISalesCreate): Promise<Sale> {
    const sales = this.salesRepository.create(data);
    return await this.salesRepository.save(sales);
  }

  public async findAll(): Promise<Sale[]> {
    return await this.salesRepository.find({ relations: ["client"] });
  }

  public async getTotalSalesByDay(): Promise<SalesByDay[]> {
    const result = await this.salesRepository
      .createQueryBuilder("sale")
      .select("DATE(sale.saleDate)", "date")
      .addSelect("SUM(sale.value)", "total")
      .addSelect("COUNT(sale.id)", "count")
      .groupBy("DATE(sale.saleDate)")
      .orderBy("DATE(sale.saleDate)", "DESC")
      .getRawMany();

    return result.map((item) => ({
      date: item.date,
      total: parseFloat(item.total) || 0,
      count: parseInt(item.count) || 0,
    }));
  }

  // 1. Cliente com maior volume de vendas
  public async getClientWithHighestSales(): Promise<ClientSalesStats | null> {
    const result = await this.salesRepository
      .createQueryBuilder("sale")
      .leftJoin("sale.client", "client")
      .select("client.id", "clientId")
      .addSelect("client.name", "clientName")
      .addSelect("client.email", "clientEmail")
      .addSelect("COUNT(sale.id)", "totalSales")
      .addSelect("SUM(sale.value)", "totalValue")
      .addSelect("AVG(sale.value)", "averageValue")
      .groupBy("client.id")
      .addGroupBy("client.name")
      .addGroupBy("client.email")
      .orderBy("SUM(sale.value)", "DESC")
      .limit(1)
      .getRawOne();

    if (!result) return null;

    return {
      clientId: result.clientId,
      clientName: result.clientName,
      clientEmail: result.clientEmail,
      totalSales: parseInt(result.totalSales) || 0,
      totalValue: parseFloat(result.totalValue) || 0,
      averageValue: parseFloat(result.averageValue) || 0,
    };
  }

  // 2. Cliente com maior média de valor por venda
  public async getClientWithHighestAverage(): Promise<ClientSalesStats | null> {
    const result = await this.salesRepository
      .createQueryBuilder("sale")
      .leftJoin("sale.client", "client")
      .select("client.id", "clientId")
      .addSelect("client.name", "clientName")
      .addSelect("client.email", "clientEmail")
      .addSelect("COUNT(sale.id)", "totalSales")
      .addSelect("SUM(sale.value)", "totalValue")
      .addSelect("AVG(sale.value)", "averageValue")
      .groupBy("client.id")
      .addGroupBy("client.name")
      .addGroupBy("client.email")
      .orderBy("AVG(sale.value)", "DESC")
      .limit(1)
      .getRawOne();

    if (!result) return null;

    return {
      clientId: result.clientId,
      clientName: result.clientName,
      clientEmail: result.clientEmail,
      totalSales: parseInt(result.totalSales) || 0,
      totalValue: parseFloat(result.totalValue) || 0,
      averageValue: parseFloat(result.averageValue) || 0,
    };
  }

  // 3. Cliente com maior número de dias únicos com vendas
  public async getClientWithMostUniqueDays(): Promise<ClientSalesStats | null> {
    const result = await this.salesRepository
      .createQueryBuilder("sale")
      .leftJoin("sale.client", "client")
      .select("client.id", "clientId")
      .addSelect("client.name", "clientName")
      .addSelect("client.email", "clientEmail")
      .addSelect("COUNT(sale.id)", "totalSales")
      .addSelect("SUM(sale.value)", "totalValue")
      .addSelect("AVG(sale.value)", "averageValue")
      .addSelect("COUNT(DISTINCT DATE(sale.saleDate))", "uniqueDays")
      .groupBy("client.id")
      .addGroupBy("client.name")
      .addGroupBy("client.email")
      .orderBy("COUNT(DISTINCT DATE(sale.saleDate))", "DESC")
      .limit(1)
      .getRawOne();

    if (!result) return null;

    return {
      clientId: result.clientId,
      clientName: result.clientName,
      clientEmail: result.clientEmail,
      totalSales: parseInt(result.totalSales) || 0,
      totalValue: parseFloat(result.totalValue) || 0,
      averageValue: parseFloat(result.averageValue) || 0,
      uniqueDays: parseInt(result.uniqueDays) || 0,
    };
  }
}

export default SalesRepository;
