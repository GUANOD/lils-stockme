import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { company } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { Public, Role, RoleRequired } from 'src/config/guardsConstants';
import { CompaniesService } from './companies.service';
import { CompanyDto, Company_ids, Company_type } from './dto';

@Controller('companies')
@UseGuards(JwtGuard)
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  //////////////// CREATE /////////////////////////

  /**
   *
   * @returns
   *
   */
  @Post('create')
  @Public()
  // @RoleRequired(Role.Admin)
  createCompany(@Body() dto: CompanyDto) {
    return this.companiesService.createCompany(dto);
  }

  /**
   *
   * @returns
   *
   */
  @Post('createType')
  @Public()
  createCompanyType(@Body() dto: Company_type) {
    return this.companiesService.createCompanyType(dto);
  }

  //////////////// READ /////////////////////////
  /**
   *
   * @returns
   *
   */
  @Get('allCompanies')
  getAllCompanies() {
    return this.companiesService.getAllCompanies();
  }

  /**
   *
   * @returns
   *
   */
  @Post('companiesByIds')
  getCompanyByIds(@Body() dto: Company_ids) {
    return this.companiesService.getCompaniesByIds(dto.ids);
  }

  //////////////// UPDATE /////////////////////////
  /**
   *
   * @returns
   *
   */
  @Patch('updateCompanyById')
  @RoleRequired(Role.Manager)
  updateCompany(@Body() dto: CompanyDto) {
    return this.companiesService.updateCompanyById(dto);
  }
}
