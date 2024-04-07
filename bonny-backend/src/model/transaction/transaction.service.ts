import { Injectable } from '@nestjs/common';
import { Transaction } from './transaction.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async getAll(): Promise<Transaction[]> {
    return (await this.transactionRepository.find(
      {
        relations: {
          receipt: true
        }
      }
    ));

    return await this.transactionRepository.find();
  }

  async add(transaction: Transaction): Promise<Transaction> {
    const newTransaction = await this.transactionRepository.create(transaction);
    return await this.transactionRepository.save(newTransaction);
  }

  async get(id: number): Promise<Transaction> {
    return await this.transactionRepository.findOneBy({ id: id });
  }

  async update(
    id: number,
    transaction: Partial<Transaction>,
  ): Promise<Transaction> {
    await this.transactionRepository.update(id, transaction);
    return await this.transactionRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.transactionRepository.findOneByOrFail({ id: id });
    return await this.transactionRepository.delete(id);
  }
}
