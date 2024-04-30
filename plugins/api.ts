import type { NitroFetchOptions } from 'nitropack';
import PollingService from '~/api/services/poller-service';

export interface ApiInstance {
  polling: PollingService,
}

export default defineNuxtPlugin({
  name: 'api',
  setup(app) {
    const fetchOptions: NitroFetchOptions<string> = {
      baseURL: app.$config.public.API_BASE_URL,
    };

    const apiFetcher = $fetch.create(fetchOptions);

    const modules: ApiInstance = {
      polling: new PollingService(apiFetcher),
    };

    return {
      provide: {
        api: modules,
      },
    };
  },
});
