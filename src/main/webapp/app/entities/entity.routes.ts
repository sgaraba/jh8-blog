import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'client',
    data: { pageTitle: 'jh8App.client.home.title' },
    loadChildren: () => import('./client/client.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
