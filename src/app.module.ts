import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { ConfigModule } from '@nestjs/config';
import { Client } from './db/client';

@Module({
  imports: [StudentsModule,
    ConfigModule.forRoot({isGlobal:true,
      envFilePath: '.env',}) ],
  controllers: [AppController],
  providers: [AppService, Client],
})
export class AppModule {}
