import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [QuoteController],
  providers: [QuoteService],
})
export class QuoteModule {}
