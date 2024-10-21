import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(NoopAnimationsModule),
    importProvidersFrom(HttpClientModule)
  ]
}).catch(err => console.error(err));