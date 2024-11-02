import * as crypto from 'crypto';
import * as CryptoJS from 'crypto-js';
import { ConfigService } from '@nestjs/config';
import {
    ParseIntPipe,
    BadRequestException
} from '@nestjs/common';

export function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

export function decryptPassword(encryptedPassword: string): string {
  const configService = new ConfigService();
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, configService.get('crypto_secret_key'));
  return bytes.toString(CryptoJS.enc.Utf8);
}


export function generateParseIntPipe(name) {
  return new ParseIntPipe({
    exceptionFactory() {
      throw new BadRequestException(name + ' 应该传数字');
    } 
  })
}