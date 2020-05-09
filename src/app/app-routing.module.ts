import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { CreateCustomerComponent } from './customers/create-customer/create-customer.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductsComponent } from './products/products.component';


const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'customers', component: CustomersListComponent },
  { path: 'add', component: CreateCustomerComponent },
  { path: 'login', component: LogInComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin/products/new', component: ProductFormComponent },
  { path: 'admin/products/:id', component: ProductFormComponent },
  { path: 'admin/products', component: AdminProductsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
