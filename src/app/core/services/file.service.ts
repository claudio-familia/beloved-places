import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { KeyValueModel } from '../models/key-value.model';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    constructor() {}

    async set(newVal: KeyValueModel): Promise<void> {
        await Storage.set({
            key: newVal.key,
            value: newVal.value,
        });
    }

    async get(key: string): Promise<string> {
        const { value } = await Storage.get({ key });
        return value;
    }

    async delete(key: string): Promise<void> {
        await Storage.remove({ key });
    }
}
