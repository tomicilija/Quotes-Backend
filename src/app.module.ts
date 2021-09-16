import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { QuoteModule } from './modules/quote/quote.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Quote } from './entities/quote.entity';
import { Vote } from './entities/vote.entity';

@Module({
  imports: [
    AuthModule,
    UserModule,
    QuoteModule,
    TypeOrmModule.forFeature([User, Quote, Vote]),
    // Database connection
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'user-quotes',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
