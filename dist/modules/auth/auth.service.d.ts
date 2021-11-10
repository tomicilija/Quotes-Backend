import { AuthRepository } from './auth.repository';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private authRepository;
    private jwtService;
    constructor(authRepository: AuthRepository, jwtService: JwtService);
    signUp(createUserDto: CreateUserDto): Promise<void>;
    signIn(loginUserDto: LoginUserDto): Promise<{
        accesToken: string;
    }>;
}
