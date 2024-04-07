import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';


@Controller('admin')
export class AdminController {

    constructor(private adminService: AdminService) {}

    @Get('transactions')
    async loadTransactions() {
        return await this.adminService.loadDashboardTransactions();
    }
}