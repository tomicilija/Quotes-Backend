"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const quote_controller_1 = require("./quote.controller");
const quote_repository_1 = require("./quote.repository");
const quote_service_1 = require("./quote.service");
const vote_repository_1 = require("./vote.repository");
let QuoteModule = class QuoteModule {
};
QuoteModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([quote_repository_1.QuoteRepository, vote_repository_1.VoteRepository]),
            auth_module_1.AuthModule,
        ],
        controllers: [quote_controller_1.QuoteController],
        providers: [quote_service_1.QuoteService],
    })
], QuoteModule);
exports.QuoteModule = QuoteModule;
//# sourceMappingURL=quote.module.js.map