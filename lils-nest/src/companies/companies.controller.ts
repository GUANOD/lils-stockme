import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CompaniesService } from './companies.service';
import { CompanyDto, Company_ids, Company_type } from './dto';

@Controller('companies')
@UseGuards(AuthGuard('jwt'))
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  /**
   *
   * @returns
   *
   */
  @Get('allcompanies')
  getAllCompanies() {
    return this.companiesService.getAllCompanies();
  }

  /**
   *
   * @returns
   *
   */
  @Post('companiesbyids')
  getCompanyByIds(@Body() dto: Company_ids) {
    return this.companiesService.getCompaniesByIds(dto.ids);
  }

  /**
   *
   * @returns
   *
   */
  @Post('create')
  createCompany(@Body() dto: CompanyDto) {
    return this.companiesService.createCompany(dto);
  }

  /**
   *
   * @returns
   *
   */
  @Post('createType')
  createCompanyType(@Body() dto: Company_type) {
    return this.companiesService.createCompanyType(dto);
  }
}
