"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../entities/user.entity");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthRepository = class AuthRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.jwtService = jwt_1.JwtService;
    }
    async signUp(createUserDto) {
        const { email, pass, passConfirm, name, surname } = createUserDto;
        if (pass !== passConfirm) {
            throw new common_1.ConflictException('Passwords do not match');
        }
        else {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(pass, salt);
            const user = this.create({
                email,
                pass: hashedPassword,
                name,
                surname,
            });
            try {
                await this.save(user);
            }
            catch (error) {
                if (error.code === '23505') {
                    throw new common_1.ConflictException('User is already registerd with that email!');
                }
                else {
                    throw new common_1.InternalServerErrorException();
                }
            }
        }
    }
};
AuthRepository = __decorate([
    (0, typeorm_1.EntityRepository)(user_entity_1.User)
], AuthRepository);
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=auth.repository.js.map