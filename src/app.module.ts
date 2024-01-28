import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BraintreeModule } from './braintree/braintree.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BraintreeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
