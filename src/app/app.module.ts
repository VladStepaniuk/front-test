// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CategoryTreeComponent } from './category-tree/category-tree.component';

@NgModule({
  declarations: [
    
    CategoryTreeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
  ],
  bootstrap: [/* Your main component here, if any */],
})
export class AppModule {}
