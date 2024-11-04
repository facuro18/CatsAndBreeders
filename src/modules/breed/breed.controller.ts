import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BreedService } from './breed.service';
import { BreedEntity } from './entities/breed.entity';
import { BreedDto, CreateBreedDto, UpdateBreedDto } from './dtos';
import { toDtoFromBreed } from './mappers';

@Controller('breeds')
@ApiTags('Breeds')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @Post()
  @ApiResponse({ type: BreedEntity, status: 201 })
  create(@Body() createBreedDto: CreateBreedDto): Promise<BreedEntity> {
    return this.breedService.create(createBreedDto);
  }

  @Get()
  @ApiResponse({ type: BreedDto, status: 200, isArray: true })
  async findAll(): Promise<BreedDto[]> {
    const breeds = await this.breedService.findAll();
    console.log(breeds);
    const breedsMapped = breeds.map((breed) => toDtoFromBreed(breed));
    console.log(breedsMapped);
    return breedsMapped;
  }

  @Get(':id')
  @ApiResponse({ type: BreedDto, status: 200 })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<BreedDto> {
    const breed = await this.breedService.findById(id);
    return toDtoFromBreed(breed);
  }

  @Patch(':id')
  @ApiResponse({ type: BreedDto, status: 200 })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateBreedDto: UpdateBreedDto): Promise<BreedDto> {
    const updatedBreed = await this.breedService.update(id, updateBreedDto);
    return toDtoFromBreed(updatedBreed);
  }

  @Delete(':id')
  @ApiResponse({ type: String, status: 200 })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<string> {
    await this.breedService.delete(id);
    return 'Breed deleted successfully';
  }
}
