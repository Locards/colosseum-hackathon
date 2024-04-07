import { Injectable } from '@nestjs/common';
import { Receipt } from './receipt.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReceiptService {
  constructor(
    @InjectRepository(Receipt)
    private receiptRepository: Repository<Receipt>,
  ) {}

  async getAll(): Promise<Receipt[]> {
    return await this.receiptRepository.find();
  }

  async add(receipt: Receipt): Promise<Receipt> {
    const newReceipt = await this.receiptRepository.create(receipt);
    return await this.receiptRepository.save(newReceipt);
  }

  async get(id: number): Promise<Receipt> {
    return await this.receiptRepository.findOneBy({ id: id });
  }

  async update(id: number, Receipt: Partial<Receipt>): Promise<Receipt> {
    await this.receiptRepository.update(id, Receipt);
    return await this.receiptRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.receiptRepository.findOneByOrFail({ id: id });
    return await this.receiptRepository.delete(id);
  }
}
