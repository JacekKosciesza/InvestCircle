import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material';

import { HelpRoutingModule } from './help-routing.module';
import { HelpPage } from './help.page';
import { AboutTab } from './about';
import { PrivacyTab } from './privacy';
import { TermsTab } from './terms';

@NgModule({
  imports: [HelpRoutingModule, MatTabsModule],
  declarations: [HelpPage, AboutTab, PrivacyTab, TermsTab],
})
export class HelpModule {}
