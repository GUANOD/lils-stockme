import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanyDto, Company_type } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { isNumber } from 'class-validator';

@Injectable()
export class CompaniesService {
  constructor(private prismaService: PrismaService) {}

  //////////////// CREATE /////////////////////////

  /**
   *
   * @param data
   *
   */
  createCompany = async (data: CompanyDto) => {
    try {
      // CREATE WILL THROW ERROR P2002 IF COMPANY TYPE DOES EXIST
      const company = await this.prismaService.company.create({ data });
      return { message: `Company ${company.company_name} created` };
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code == 'P2003') {
          // company type foreign key constraint fails
          throw new HttpException(
            "Company type doesn't exist",
            HttpStatus.BAD_REQUEST,
          );
        } else if (err.code == 'P2002') {
          // company already exists
          throw new HttpException(
            "Can't create this company",
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      //if error is unknown
      throw new HttpException('Server error', 500);
    }
  };

  /**
   *
   *
   */
  createCompanyType = async (data: Company_type) => {
    try {
      const company_type = await this.prismaService.company_type.create({
        data,
      });
      return {
        message: `Company Type ${company_type.company_type_name} has been created`,
      };
    } catch (error) {
      throw new HttpException('Server error', 500);
    }
  };

  //////////////// READ /////////////////////////

  /**
   *
   * @returns
   *
   *
   */
  getAllCompanies = async () => {
    try {
      const entreprises = await this.prismaService.company.findMany();
      return entreprises;
    } catch (err) {
      throw new HttpException('Server error', 500);
    }
  };

  /**
   *
   * @param ids
   *
   * returns
   */
  getCompaniesByIds = async (ids: number[]) => {
    try {
      const entreprises = await this.prismaService.company.findMany({
        where: { company_id: { in: ids } },
      });

      if (!entreprises.length) {
        throw new HttpException(
          'No companies found in search',
          HttpStatus.BAD_REQUEST,
        );
      }

      return entreprises;
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException('Server error', 500);
    }
  };

  //////////////// UPDATE /////////////////////////

  updateCompanyById = async (dto: CompanyDto) => {
    try {
      const entreprise = await this.prismaService.company.update({
        where: { company_id: dto.company_id },
        data: { ...dto },
      });

      if (!entreprise) {
        throw new HttpException(
          'No companies match the criteria!',
          HttpStatus.BAD_REQUEST,
        );
      }

      return { res: 'Company successfully updated' };
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new HttpException('Bad request', 403);
        }
      }
      throw new HttpException('Server error', 500);
    }
  };
}
