export interface Lab {
    id?: string;
    patientId: string;
    labType: string;
    labValue: number;
    date: string;
    isHidden: boolean;
}
