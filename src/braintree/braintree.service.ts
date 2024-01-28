import { Injectable } from '@nestjs/common';
import { BraintreeGateway, ValidatedResponse, Environment, Transaction } from 'braintree';
import * as config from 'config';



@Injectable()
export class BraintreeService {
  private gateway: BraintreeGateway;

  constructor() {
    const braintreeConfig = config.get('braintree');

    this.gateway = new BraintreeGateway({
      environment: Environment.Sandbox,
      merchantId: braintreeConfig.merchantId,
      publicKey: braintreeConfig.publicKey,
      privateKey: braintreeConfig.privateKey,
    });
  }

  async generateClientToken(): Promise<any> {
    let data = await this.gateway.clientToken.generate({});
    if(data) {
      return data.clientToken;
    }else{
      throw new Error('Error generating client token');
    }
  }

  // Example usage in BraintreeService
  async processPayment(nonce: string, amount: number): Promise<ValidatedResponse<Transaction>> {
    return this.gateway.transaction.sale({
      amount: amount.toFixed(2),
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true,
      },
    });
  }

}
