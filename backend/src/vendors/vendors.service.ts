import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { Vendor } from './entities/vendor.entity';
import { Repository } from 'typeorm';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor) private vendorsRepository: Repository<Vendor>,
  ) {}

  create(createVendorDto: CreateVendorDto) {
    return this.vendorsRepository.save(createVendorDto);
  }

  async findAll(paginationDto: PaginationDto) {
    const [data, total] = await Promise.all([
      this.vendorsRepository.find({
        skip: paginationDto.skip,
        take: paginationDto.limit,
      }),
      this.vendorsRepository.count(),
    ]);

    return { data, total };
  }

  async findOne(id: number) {
    const vendor = await this.vendorsRepository.findOneBy({ id });
    if (!vendor) throw new NotFoundException();
    return vendor;
  }

  async update(id: number, updateVendorDto: UpdateVendorDto) {
    const vendor = await this.vendorsRepository.preload({
      id,
      ...updateVendorDto,
    });

    if (!vendor) throw new NotFoundException();

    return this.vendorsRepository.save(vendor);
  }

  async delete(id: number) {
    const deletedResult = await this.vendorsRepository.delete(id);

    if (deletedResult.affected === 0) {
      throw new NotFoundException();
    }
  }
}
