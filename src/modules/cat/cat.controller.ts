import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateCatDto, UpdateCatDto } from './dtos';
import { CatEntity } from './entities/cat.entity';

@Controller('cats')
export class CatController {
  constructor(private readonly catsService: CatService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll(): Promise<CatEntity[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.catsService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.catsService.delete(+id);
  }
}

/*
  
 
import { Response } from 'express';

interface ApiResponse<T> {
  ok: boolean;
  message?: string;
  data?: T;
  error?: string;
}

const sendResponse = <T>(
  res: Response,
  data: T | null,
  message: string = 'Operación completada',
  status: number = 200,
  error: string | null = null
): Response<ApiResponse<T>> => {
  return res.status(status).json({
    ok: !error,
    message: error ? error : message,
    data: error ? null : data,
  });
};

export default sendResponse;

    @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    try {
      const cats = await this.catsService.findAll();
      return sendResponse(res, cats);
    } catch (error) {
      return sendResponse(res, null, error.message, 500);
    }
  }



  */
