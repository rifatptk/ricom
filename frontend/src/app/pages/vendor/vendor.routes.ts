import { Routes } from '@angular/router';

export const vendorRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./vendor-dashboard/vendor-dashboard.component').then(
        (m) => m.VendorDashboardComponent
      ),
  },
];
