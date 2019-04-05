import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpPage } from './help.page';
import { AboutTab } from './about';
import { TermsTab } from './terms';
import { PrivacyTab } from './privacy';

const routes: Routes = [
  {
    path: '',
    component: HelpPage,
    children: [
      {
        path: 'about',
        component: AboutTab,
      },
      {
        path: 'terms',
        component: TermsTab,
      },
      {
        path: 'privacy',
        component: PrivacyTab,
      },
      { path: '', redirectTo: 'about' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpRoutingModule {}
