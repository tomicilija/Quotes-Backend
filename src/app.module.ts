import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { QuoteModule } from './modules/quote/quote.module';

@Module({
  imports: [AuthModule, UserModule, QuoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
