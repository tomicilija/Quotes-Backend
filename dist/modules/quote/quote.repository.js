"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteRepository = void 0;
const common_1 = require("@nestjs/common");
const quote_entity_1 = require("../../entities/quote.entity");
const typeorm_1 = require("typeorm");
let QuoteRepository = class QuoteRepository extends typeorm_1.Repository {
    async getQuote(user_id) {
        const found = await this.findOne({ where: { user_id: user_id } });
        if (!found) {
            throw new common_1.NotFoundException(`Quote not found`);
        }
        return found;
    }
    async createQuote(createQuoteDto, user_id) {
        const { text } = createQuoteDto;
        const datetime = new Date();
        const quote = this.create({
            text,
            karma: 0,
            creation_date: datetime,
            user_id,
        });
        await this.save(quote);
    }
    async deleteVote(quote_id) {
        const vote = await this.query('DELETE FROM vote WHERE quote_id = $1', [
            quote_id,
        ]);
        if (vote.affected == 0) {
            throw new common_1.NotFoundException(`Vote not fund`);
        }
    }
    async deleteQuote(user_id) {
        const quote = await this.getQuote(user_id);
        this.deleteVote(quote.id);
        const result = await this.delete(quote);
        if (result.affected == 0) {
            throw new common_1.NotFoundException(`Quote not fund`);
        }
    }
    async updateQuote(createQuoteDto, user_id) {
        const quote = await this.getQuote(user_id);
        this.deleteVote(quote.id);
        if (!quote) {
            throw new common_1.NotFoundException(`Quote not found`);
        }
        const datetime = new Date();
        quote.text = createQuoteDto.text;
        quote.karma = 0;
        quote.creation_date = datetime;
        await this.save(quote);
    }
    async updateQuoteKarma(status, user_id) {
        const quote = await this.findOne({ where: { user_id: user_id } });
        if (!quote) {
            throw new common_1.NotFoundException(`Quote not found`);
        }
        quote.karma = quote.karma + status;
        await this.save(quote);
    }
};
QuoteRepository = __decorate([
    (0, typeorm_1.EntityRepository)(quote_entity_1.Quote)
], QuoteRepository);
exports.QuoteRepository = QuoteRepository;
//# sourceMappingURL=quote.repository.js.map