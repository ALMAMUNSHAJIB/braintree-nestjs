import { Module } from '@nestjs/common';
import { BraintreeService } from './braintree.service';
import { BraintreeController } from './braintree.controller';

@Module({
  controllers: [BraintreeController],
  providers: [BraintreeService]
})
export class BraintreeModule {}
