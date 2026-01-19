import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import {
  provideTranslateHttpLoader,
} from '@ngx-translate/http-loader';
import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import localeEnGb from '@angular/common/locales/en-GB';
import localeEnGbExtra from '@angular/common/locales/extra/en-GB';
import {
  provideTranslateService as coreTranslateService,
  TranslateService,
} from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

registerLocaleData(localeNl, 'nl-NL');
registerLocaleData(localeEnGb, 'en-US', localeEnGbExtra);

export function provideTranslateService(): EnvironmentProviders {
  const fallbackLang = 'en-US';

  return makeEnvironmentProviders([
    coreTranslateService({
      fallbackLang: fallbackLang,
      loader: provideTranslateHttpLoader({
        prefix: './assets/translations/',
        suffix: '.json',
        useHttpBackend: true
      }),
    }),

    provideAppInitializer(async () => {
      const translate = inject(TranslateService);

      await firstValueFrom(translate.use(fallbackLang));
    }),
  ]);
}
