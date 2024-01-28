import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BraintreeService } from './braintree.service';


@Controller('braintree')
export class BraintreeController {
  constructor(private readonly braintreeService: BraintreeService) {}
  @Get('token')
  async getClientToken(): Promise<{ clientToken: string }> {
    const clientToken = await this.braintreeService.generateClientToken();
    return { clientToken };
  }

  // Example handling in PaymentController
  @Post('process')
  async processPayment(@Body('nonce') nonce: string, @Body('amount') amount: number) {
    try {
      const result = await this.braintreeService.processPayment(nonce, amount);

      // Access properties of Transaction
      const transactionId = result.transaction.id;
      const amountProcessed = result.transaction.amount;

      // ... rest of the handling
    } catch (error) {
      // Handle error
      console.error(error.message);
    }
  }
}
