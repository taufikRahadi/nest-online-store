import { Injectable } from '@nestjs/common';

require('dotenv').config();

@Injectable()
export class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }
  
}

const configService = new ConfigService(process.env)
  .ensureValues([]);

export { configService };
