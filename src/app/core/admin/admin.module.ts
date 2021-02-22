import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  AccordionModule,
  BsDropdownModule,
  ModalModule, 
  TabsModule,
  TooltipModule
} from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { AlertModule } from "ngx-bootstrap/alert";
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { RouterModule } from '@angular/router';
import { AdminRoutes } from './admin.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagementAuditComponent } from './management-audit/management-audit.component';
import { ManagementUserComponent } from './management-user/management-user.component';
import { ReportComponent } from './report/report.component';
import { ApiManagementComponent } from './api-management/api-management.component';
import { ServerConfigurationComponent } from './server-configuration/server-configuration.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { RolesComponent } from './roles/roles.component';
import { DataIntegrationComponent } from './data-integration/data-integration.component';
import { DataDiscoveryComponent } from './data-discovery/data-discovery.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ManagementAuditComponent,
    ManagementUserComponent,
    ReportComponent,
    ApiManagementComponent,
    ServerConfigurationComponent,
    ManageUserComponent,
    RolesComponent,
    DataIntegrationComponent,
    DataDiscoveryComponent
  ],
  imports: [
    CommonModule,
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    LoadingBarModule,
    NgxDatatableModule,
    RouterModule.forChild(AdminRoutes),
    AlertModule.forRoot(),
  ]
})
export class AdminModule { }
