import {
  Controller,
  Post,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  Body,
  Request,
  Get,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response-message-decorator';
import { CommentService } from './comment.service';
import {
  CommentListResponseDto,
  CommentResponse,
  CommentResponseDto,
  DeleteCommentResponse,
  GetCommentsQueryDto,
} from './dto/comment-response.dto';
import { CreateCommentDto, UpdateCommentDto } from './dto/create-comment.dto';
import { CursorPaginationDto } from '../common/dto/cursor-pagination.dto';

@ApiBearerAuth()
@ApiTags('comments')
@Controller('lps/:lpId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ResponseMessage('댓글 목록 조회에 성공헀습니다.')
  @Get()
  @ApiQuery({ type: GetCommentsQueryDto })
  @ApiOperation({
    summary: '댓글 목록 조회',
    description: '특정 게시글(Lp)에 달린 댓글 목록을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '댓글 목록 조회 성공',
    type: CommentListResponseDto,
  })
  async getComments(
    @Param('lpId', ParseIntPipe) lpId: number,
    @Query() cursorPaginationDto: Omit<CursorPaginationDto, 'search'>,
  ) {
    return await this.commentService.findAll(Number(lpId), cursorPaginationDto);
  }

  @ResponseMessage('댓글 생성에 성공했습니다.')
  @Post()
  @ApiOperation({
    summary: '댓글 생성',
    description: '해당 LP에 새로운 댓글을 생성합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '댓글 생성 성공',
    type: CommentResponseDto,
  })
  async createComment(
    @Param('lpId', ParseIntPipe) lpId: number,
    @Request() req: any,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const userId = req.user.id;
    return await this.commentService.create({
      lpId,
      userId,
      createCommentDto,
    });
  }

  @ResponseMessage('댓글 수정에 성공했습니다.')
  @Patch(':commentId')
  @ApiOperation({
    summary: '댓글 수정',
    description: '본인이 작성한 댓글만 수정할 수 있습니다.',
  })
  @ApiResponse({
    status: 200,
    description: '댓글 수정 성공',
    type: CommentResponse,
  })
  async updateComment(
    @Param('lpId', ParseIntPipe) lpId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Request() req: any,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const userId = req.user.id;
    return await this.commentService.update({
      commentId,
      lpId,
      userId,
      updateCommentDto,
    });
  }

  @ResponseMessage('댓글 삭제에 성공했습니다.')
  @Delete(':commentId')
  @ApiOperation({
    summary: '댓글 삭제',
    description: '본인이 작성한 댓글만 삭제할 수 있습니다.',
  })
  @ApiResponse({
    status: 200,
    description: '댓글 삭제 성공',
    type: DeleteCommentResponse,
  })
  async deleteComment(
    @Param('lpId', ParseIntPipe) lpId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Request() req: any,
  ) {
    const userId = req.user.id;
    return await this.commentService.delete({
      commentId,
      lpId,
      userId,
    });
  }
}
