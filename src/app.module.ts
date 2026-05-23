import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { WorkTypesModule } from './work-types/work-types.module';
import { JournalModule } from './journal/journal.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    WorkTypesModule,
    JournalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
