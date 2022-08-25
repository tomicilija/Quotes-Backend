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
exports.QuoteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const quote_repository_1 = require("./quote.repository");
const vote_repository_1 = require("./vote.repository");
let QuoteService = class QuoteService {
    constructor(quoteRepository, voteRepository) {
        this.quoteRepository = quoteRepository;
        this.voteRepository = voteRepository;
    }
    async getQuote(user_id) {
        return this.quoteRepository.getQuote(user_id);
    }
    async getUsersQuote(user_id) {
        return this.quoteRepository.getUsersQuote(user_id);
    }
    async createQuote(createQuoteDto, user_id) {
        return this.quoteRepository.createQuote(createQuoteDto, user_id);
    }
    async deleteQuote(user_id) {
        this.quoteRepository.deleteQuote(user_id);
    }
    updateQuote(createQuoteDto, user_id) {
        return this.quoteRepository.updateQuote(createQuoteDto, user_id);
    }
    async voteStatusCheck(user_id, user) {
        return this.voteRepository.voteStatusCheck(user_id, user);
    }
    async upvoteQuote(user_id, user) {
        return this.voteRepository.upvoteQuote(user_id, user).then(() => {
            this.updateQuoteKarma(1, user_id);
        });
    }
    async downvoteQuote(user_id, user) {
        return this.voteRepository.downvoteQuote(user_id, user).then(() => {
            this.updateQuoteKarma(-1, user_id);
        });
    }
    async deleteUpvoteQuote(user_id, user) {
        return this.voteRepository.deleteVote(user_id, user).then(() => {
            this.updateQuoteKarma(-1, user_id);
        });
    }
    async deleteDownvoteQuote(user_id, user) {
        return this.voteRepository.deleteVote(user_id, user).then(() => {
            this.updateQuoteKarma(1, user_id);
        });
    }
    updateQuoteKarma(status, user_id) {
        return this.quoteRepository.updateQuoteKarma(status, user_id);
    }
    async getUserVotes(user_id) {
        return this.voteRepository.getUserVotes(user_id);
    }
    async getLikesList() {
        return this.voteRepository.getLikesList();
    }
    async getRecentQuotes() {
        return this.voteRepository.getRecentQuotes();
    }
};
QuoteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(quote_repository_1.QuoteRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(vote_repository_1.VoteRepository)),
    __metadata("design:paramtypes", [quote_repository_1.QuoteRepository,
        vote_repository_1.VoteRepository])
], QuoteService);
exports.QuoteService = QuoteService;
//# sourceMappingURL=quote.service.js.map