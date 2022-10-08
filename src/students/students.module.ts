import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Client } from 'src/db/client';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, Client]
})
export class StudentsModule {}
