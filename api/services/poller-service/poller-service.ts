import HttpFactory, { type ValidatedResultType } from '../../factory';
import { pollingStatusValidator } from './schemas';
import type { PollingStatusResponse } from './schemas';

class PollingService extends HttpFactory {
  async getPollingStatus(): Promise<ValidatedResultType<PollingStatusResponse>> {
    const response = await this.get<PollingStatusResponse>('/status');

    if (response.status === 'success') {
      return pollingStatusValidator.safeParse(response.data);
    }

    return { success: false, error: response };
  }
}

export default PollingService;
