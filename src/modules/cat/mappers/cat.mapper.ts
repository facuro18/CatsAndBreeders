import { BreedEntity } from '@modules/breed/entities/breed.entity';
import { CatEntity } from '../entities/cat.entity';
// import { toBreedEntity } from '@modules/breed/mappers/breed.mapper';

export const toCatEntity = (object: Record<string, any>): CatEntity => {
  // Mapeo de propiedades básicas
  const { id, name, age, createdDate, updatedDate, deletedDate } = object;
  let breedId = null,
    breed: BreedEntity = null;

  if ('breedId' in object) breedId = object.breedId;

  if ('breed' in object) {
    breedId = object.breed.id;
    breed = { ...object.breed }; // Llama a toBreedEntity sin traer los `cats`
  }

  return new CatEntity({ id, name, age, breedId, breed, createdDate, updatedDate, deletedDate });
};

/* 

type MapperParams = {
  include?: string[]; // Propiedades específicas a incluir
  exclude?: string[]; // Propiedades específicas a excluir
  includeRelated?: boolean; // Controla si se incluye la entidad relacionada (por ejemplo, breed)
};

export class DynamicMapper {
  static toDynamicObject(cat: CatEntity, params: MapperParams = {}): Partial<CatEntity> {
    const { include, exclude, includeRelated } = params;
    let result: Partial<CatEntity> = {};

    // Recorrer las propiedades del objeto original y aplicar filtros
    Object.keys(cat).forEach((key) => {
      // Incluir o excluir propiedades según los parámetros de configuración
      if (
        (!include || include.includes(key)) && // Solo incluir las propiedades especificadas, si hay
        (!exclude || !exclude.includes(key)) // Excluir propiedades que están en la lista de exclusión
      ) {
        result[key] = cat[key as keyof CatEntity];
      }
    });

    // Condicionalmente incluir la entidad relacionada
    if (includeRelated && cat.breed) {
      result.breed = BreedMapper.toDynamicObject(cat.breed); // Llamar al mapper para `BreedEntity`
    }

    return result;
  }
}


@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number): Promise<Partial<CatEntity>> {
  const cat = await this.catService.findById(id);

  // Configuración dinámica para incluir solo las propiedades deseadas
  const params = {
    include: ['id', 'name', 'age'], // Incluir solo id, name y age
    exclude: ['deletedDate'], // Excluir deletedDate
    includeRelated: true // Incluir la entidad relacionada breed
  };

  return DynamicMapper.toDynamicObject(cat, params);
}

*/
