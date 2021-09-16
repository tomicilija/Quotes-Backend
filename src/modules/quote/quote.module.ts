import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { QuoteController } from './quote.controller';
import { QuoteRepository } from './quote.repository';
import { QuoteService } from './quote.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuoteRepository]), AuthModule],
  controllers: [QuoteController],
  providers: [QuoteService],
})
export class QuoteModule {}
