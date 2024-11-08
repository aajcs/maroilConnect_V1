import {create} from 'zustand';
import {StorageAdapter} from '../../../config/adapters/storage-adapter';
export interface ConfigState {
  checked: boolean;
  toggle: () => void;
  save: () => void;
  load: () => void;
}

export const useConfigStore = create<ConfigState>((set, get) => ({
  checked: false,
  toggle: () => set(state => ({checked: !state.checked})),
  save: async () => {
    const {checked} = get();
    await StorageAdapter.setItem('config', JSON.stringify({checked}));
  },
  load: async () => {
    const configString = await StorageAdapter.getItem('config');
    if (configString) {
      const {checked} = JSON.parse(configString);
      set({checked});
    }
  },
}));
