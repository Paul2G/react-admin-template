import type { PaginatedResponse } from '@/core/types/response';
import type {
  Device,
  DeviceFormData,
  DevicesSearchParams,
} from '@/modules/devices/types';

import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

import { supabaseErrorThrower } from '@/modules/shared/lib/utils';
import { supabase } from '@/supabase';

export async function getAllDevices(): Promise<Device[]> {
  const { data, error } = await supabase
    .from('devices')
    .select('*')
    .order('name', { ascending: true });

  supabaseErrorThrower(error);

  return camelcaseKeys(data ?? []) as Device[];
}

export async function getDevicesList(
  params: DevicesSearchParams,
): Promise<PaginatedResponse<Device>> {
  const { page = 1, pageSize = 10, search = '' } = params;

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from('devices')
    .select('*', { count: 'exact' })
    .range(from, to)
    .order('name', { ascending: true });

  if (search !== '') {
    query = query.ilike('name', `%${search.trim()}%`);
  }

  const { data, error, count } = await query;

  supabaseErrorThrower(error);

  return {
    meta: {
      currentPage: page,
      pageSize,
      totalItems: count ?? 0,
    },
    items: camelcaseKeys(data ?? []) as Device[],
  };
}

export async function getDeviceById(id: number): Promise<Device> {
  const { data, error } = await supabase
    .from('devices')
    .select('*')
    .eq('id', id)
    .single();

  supabaseErrorThrower(error);

  return camelcaseKeys(data) as Device;
}

export async function createDevice(device: DeviceFormData): Promise<Device> {
  const { data, error } = await supabase
    .from('devices')
    .insert(snakecaseKeys(device))
    .select('*')
    .single();

  supabaseErrorThrower(error);

  return camelcaseKeys(data) as Device;
}

export async function updateDevice(
  id: number,
  device: DeviceFormData,
): Promise<Device> {
  const { data, error } = await supabase
    .from('devices')
    .update(snakecaseKeys(device))
    .eq('id', id)
    .select('*')
    .single();

  supabaseErrorThrower(error);

  return camelcaseKeys(data) as Device;
}

export async function deleteDevice(id: number): Promise<void> {
  const { error } = await supabase.from('devices').delete().eq('id', id);

  supabaseErrorThrower(error);
}
