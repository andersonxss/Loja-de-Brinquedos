import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1752801210186 implements MigrationInterface {
  name = "Init1752801210186";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sale" ("id" SERIAL NOT NULL, "value" integer NOT NULL, "saleDate" date NOT NULL, "clientId" integer NOT NULL, CONSTRAINT "PK_d03891c457cbcd22974732b5de2" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "client" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "dataNascimento" date NOT NULL, CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "sale" ADD CONSTRAINT "FK_1f170accf5236a71106a84ed97b" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sale" DROP CONSTRAINT "FK_1f170accf5236a71106a84ed97b"`
    );
    await queryRunner.query(`DROP TABLE "client"`);
    await queryRunner.query(`DROP TABLE "sale"`);
  }
}
