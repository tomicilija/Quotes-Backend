"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const user_entity_1 = require("../../entities/user.entity");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const createQuote_dto_1 = require("./dto/createQuote.dto");
const quote_service_1 = require("./quote.service");
let QuoteController = class QuoteController {
    constructor(quoteService) {
        this.quoteService = quoteService;
    }
    getQuote(user_id) {
        return this.quoteService.getQuote(user_id);
    }
    createQuote(createQuoteDto, user_id) {
        return this.quoteService.createQuote(createQuoteDto, user_id);
    }
    deleteQuote(user_id) {
        return this.quoteService.deleteQuote(user_id);
    }
    updateQuote(createQuoteDto, user_id) {
        return this.quoteService.updateQuote(createQuoteDto, user_id);
    }
    upvoteQuote(quotes_user_id, user_id) {
        return this.quoteService.upvoteQuote(quotes_user_id, user_id);
    }
    downvoteQuote(quotes_user_id, user_id) {
        return this.quoteService.downvoteQuote(quotes_user_id, user_id);
    }
    deleteUpvoteQuote(quotes_user_id, user_id) {
        return this.quoteService.deleteUpvoteQuote(quotes_user_id, user_id);
    }
    deleteDownvoteQuote(quotes_user_id, user_id) {
        return this.quoteService.deleteDownvoteQuote(quotes_user_id, user_id);
    }
    getUserVotes(user_id) {
        return this.quoteService.getUserVotes(user_id);
    }
    getLikesList(user_id) {
        return this.quoteService.getLikesList(user_id);
    }
    getQuotesList() {
        return this.quoteService.getQuotesList();
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Get)('myquote'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "getQuote", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Post)('myquote'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createQuote_dto_1.CreateQuoteDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "createQuote", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Delete)('myquote'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "deleteQuote", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Patch)('myquote'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createQuote_dto_1.CreateQuoteDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "updateQuote", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Post)('/user/:id/upvote'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "upvoteQuote", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Post)('/user/:id/downvote'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "downvoteQuote", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Delete)('/user/:id/upvote'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "deleteUpvoteQuote", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Delete)('/user/:id/downvote'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "deleteDownvoteQuote", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Get)('/user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "getUserVotes", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Get)('/likes'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "getLikesList", null);
__decorate([
    (0, common_1.Get)('/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuoteController.prototype, "getQuotesList", null);
QuoteController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [quote_service_1.QuoteService])
], QuoteController);
exports.QuoteController = QuoteController;
//# sourceMappingURL=quote.controller.js.map