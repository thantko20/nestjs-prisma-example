import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPostDto: CreatePostDto) {
    return this.prisma.post.create({ data: createPostDto });
  }

  async findAll() {
    return this.prisma.post.findMany();
  }

  async findById(id: string) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({ where: { id: id }, data: updatePostDto });
  }
}
