import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { FirebaseAuthGuard } from 'src/firebase/firebase-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('transactions')
  @UseGuards(FirebaseAuthGuard)
  async loadTransactions() {
    return await this.adminService.loadDashboardTransactions();
  }
}
