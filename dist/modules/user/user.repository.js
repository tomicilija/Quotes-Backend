"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../entities/user.entity");
const bcrypt = require("bcrypt");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async getUserById(user_id) {
        const found = await this.findOne(user_id);
        if (!found) {
            throw new common_1.NotFoundException(`User wth ID: "${user_id}" not found`);
        }
        return found;
    }
    async deleteUser(user) {
        await this.query('DELETE FROM vote WHERE user_id = $1', [user.id]);
        await this.query('DELETE FROM quote WHERE user_id = $1', [user.id]);
        const result = await this.delete(user);
        if (result.affected == 0) {
            throw new common_1.NotFoundException(`User with ID: "${user.id}" not fund`);
        }
    }
    async updateUser(user, createUserDto) {
        const { email, pass, passConfirm, name, surname } = createUserDto;
        const newUser = await this.getUserById(user.id);
        const found = await this.query('SELECT * FROM public.user WHERE email = $1', [email]);
        if (found[0]) {
            throw new common_1.ConflictException(`User wth this email already exists! \n`);
        }
        if (pass !== passConfirm) {
            throw new common_1.ConflictException('Passwords do not match');
        }
        else {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(createUserDto.pass, salt);
            newUser.email = email;
            newUser.pass = hashedPassword;
            newUser.name = name;
            newUser.surname = surname;
            await this.save(newUser);
        }
        return newUser;
    }
};
UserRepository = __decorate([
    (0, typeorm_1.EntityRepository)(user_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map