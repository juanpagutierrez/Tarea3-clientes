import { Routes } from '@angular/router';
import { Users } from './pages/users/users';
import { UpdateUser } from './pages/users/update-user/update-user';

export const routes: Routes = [
    { path: 'users', component: Users },
    { path: 'users/update/:id', component: UpdateUser },
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: '**', redirectTo: '/users' }
];