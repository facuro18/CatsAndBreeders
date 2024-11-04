import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatDto, CreateCatDto, UpdateCatDto } from './dtos';
import { CatEntity } from './entities/cat.entity';
import { toDtoFromCat } from './mappers/index';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('cats')
@ApiTags('Cats')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  @ApiResponse({ type: CatEntity, status: 201 })
  create(@Body() createCatDto: CreateCatDto): Promise<CatEntity> {
    return this.catService.create(createCatDto);
  }

  @Get()
  @ApiResponse({ type: CatDto, status: 200, isArray: true })
  async findAll(): Promise<CatDto[]> {
    const cats = await this.catService.findAll();
    console.log(cats);
    const catsMapped = cats.map((cat) => toDtoFromCat(cat));
    console.log(catsMapped);

    return catsMapped;
  }

  @Get(':id')
  @ApiResponse({ type: CatDto, status: 200 })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<CatDto> {
    const cat = await this.catService.findById(id);
    return toDtoFromCat(cat);
  }

  @Patch(':id')
  @ApiResponse({ type: CatDto, status: 200 })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCatDto: UpdateCatDto): Promise<CatDto> {
    const updatedCat = await this.catService.update(id, updateCatDto);
    return toDtoFromCat(updatedCat);
  }

  @Delete(':id')
  @ApiResponse({ type: String, status: 200 })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<string> {
    await this.catService.delete(id);
    return 'Cat deleted successfully';
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
