import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './feedback.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  async createFeedback(data: CreateFeedbackDto) {
    return this.prisma.feedback.create({
      data,
    });
  }

  async getAllFeedbacks() {
    return this.prisma.feedback.findMany();
  }

  async getFeedbacksByOrder(orderId: string) {
    return this.prisma.feedback.findMany({
      where: { order_id: orderId },
    });
  }

  async getFeedbacksByUser(userId: string) {
    return this.prisma.feedback.findMany({
      where: { user_id: userId },
    });
  }
}
