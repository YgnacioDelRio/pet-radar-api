export class CreateUserDto{
    name!: string;
    lastName!: string;
    email!: string;
    password!: string;
    isPetAlertEnabled!: boolean;
    radius!: number;
    lon!: number;
    lat!: number;
}