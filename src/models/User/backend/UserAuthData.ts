
import * as rev from 'rev-models';

export class UserAuthData {

    @rev.AutoNumberField()
        id: number;
    @rev.IntegerField()
        userId: number;
    @rev.TextField({ label: 'Username' })
        username: string;
    @rev.PasswordField({ label: 'Password' })
        password: string;
    @rev.DateField({ label: 'Last Login', required: false })
        last_login: Date;

}