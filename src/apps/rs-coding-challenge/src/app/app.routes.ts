import { Route } from '@angular/router';
import { StartPageComponent } from './pages/start-page.component';
import { StartPageResolver } from './resolvers/start-page.resolver';

export const appRoutes: Route[] = [
  {
    path: 'start',
    component: StartPageComponent,
    resolve: {
      data: StartPageResolver
    }
  },
  { path: '**', redirectTo: 'start' },
];
