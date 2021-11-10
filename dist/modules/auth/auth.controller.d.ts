import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
export declare class AuthController {
    private authrService;
    constructor(authrService: AuthService);
    signUp(createUserDto: CreateUserDto): Promise<void>;
    signIn(loginUserDto: LoginUserDto): Promise<{
        accesToken: string;
    }>;
}
