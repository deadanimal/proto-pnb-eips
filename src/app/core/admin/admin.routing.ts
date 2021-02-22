import { Routes } from '@angular/router';
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

export const AdminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'api-management',
                component: ApiManagementComponent
            },
            {
                path: 'server-configuration',
                component: ServerConfigurationComponent
            },
            {
                path: 'management',
                children: [
                    {
                        path: 'manage-user',
                        component: ManageUserComponent
                    },
                    {
                        path: 'user',
                        component: ManagementUserComponent
                    },
                    {
                        path: 'roles',
                        component: RolesComponent
                    },
                ]
            },
            {
                path: 'audit-trails',
                component: ManagementAuditComponent
            },
            {
                path: 'data-integration',
                component: DataIntegrationComponent
            },
            {
                path: 'data-discovery',
                component: DataDiscoveryComponent
            },
            
            // {
            //     path: 'management',
            //     children: [
            //         {
            //             path: 'audit-trails',
            //             component: ManagementAuditComponent
            //         },
            //         {
            //             path: 'user',
            //             component: ManagementUserComponent
            //         }
            //     ]
            // },
            // {
            //     path: 'report',
            //     component: ReportComponent
            // }
        ]
    }
]