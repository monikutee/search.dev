export interface DataReset {
	id?: string;
	userId: string;
	resetExpires: Date;
	reseted?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
	data?: any;
}
