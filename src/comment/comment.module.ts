import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationService } from '../common/pagination.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService, PrismaService, PaginationService],
})
export class CommentModule {}
