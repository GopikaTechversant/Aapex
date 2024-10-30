import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
bootstrapApplication(AppComponent, {
  ...appConfig,  // Spread the existing app configuration
  providers: [
    provideHttpClient(),  // Provide HttpClient globally
    ...(appConfig.providers || []),  // Ensure other providers are preserved
  ],
}).catch((err) => console.error(err));