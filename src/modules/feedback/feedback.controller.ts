import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './feedback.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  async createFeedback(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.createFeedback(createFeedbackDto);
  }

  @Get()
  async getAllFeedbacks() {
    return this.feedbackService.getAllFeedbacks();
  }

  @Get('order/:orderId')
  async getFeedbacksByOrder(@Param('orderId') orderId: string) {
    return this.feedbackService.getFeedbacksByOrder(orderId);
  }

  @Get('user/:userId')
  async getFeedbacksByUser(@Param('userId') userId: string) {
    return this.feedbackService.getFeedbacksByUser(userId);
  }
}
