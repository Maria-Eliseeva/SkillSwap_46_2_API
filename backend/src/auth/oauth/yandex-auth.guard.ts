import {
  Inject,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { yandexOAuthConfig } from '../../config/yandex-oauth.config';

@Injectable()
export class YandexAuthGuard extends AuthGuard('yandex') {
  constructor(
    @Inject(yandexOAuthConfig.KEY)
    private readonly yandexConfiguration: ConfigType<typeof yandexOAuthConfig>,
  ) {
    super();
  }

  getAuthenticateOptions(): Record<string, never> {
    const clientId = this.yandexConfiguration.clientId.trim();
    const clientSecret = this.yandexConfiguration.clientSecret.trim();

    if (!clientId || !clientSecret) {
      throw new ServiceUnavailableException(
        'Вход через Яндекс временно недоступен. Попробуйте позже.',
      );
    }

    return {};
  }
}
