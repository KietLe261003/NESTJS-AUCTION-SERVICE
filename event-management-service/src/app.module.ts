import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { StaffEventModule } from './staff-event/staff-event.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'auction',
      password: '@GiaHau123',
      database: 'auction_event_db',
      entities: [],
      synchronize: true,
    }),
    EventModule,
    StaffEventModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
