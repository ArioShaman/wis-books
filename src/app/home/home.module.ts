import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { HomeRoutingModule } from './home-routing.module';
import { HomeView } from './views/home/home.view';
import { HelloBlockComponent } from './components/hello-block/hello-block.component';
import { ExplainBlockComponent } from './components/explain-block/explain-block.component';
import { PurposeComponent } from './components/purpose/purpose.component';
import { AddministrationComponent } from './components/addministration/addministration.component';
import { FooterComponent } from './components/footer/footer.component';
import { VideoBlockComponent } from './components/video-block/video-block.component';


@NgModule({
  declarations: [
    HomeView,
    HelloBlockComponent,
    ExplainBlockComponent,
    PurposeComponent,
    AddministrationComponent,
    FooterComponent,
    VideoBlockComponent
  ],
  imports: [
    CommonModule,

    MatButtonModule,

    HomeRoutingModule
  ]
})
export class HomeModule { }
