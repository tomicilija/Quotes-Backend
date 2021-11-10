"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteRepository = void 0;
const common_1 = require("@nestjs/common");
const vote_entity_1 = require("../../entities/vote.entity");
const typeorm_1 = require("typeorm");
let VoteRepository = class VoteRepository extends typeorm_1.Repository {
    async upvoteQuote(quotes_user_id, user_id) {
        const user = user_id.id;
        const quote = await this.query('SELECT id FROM quote WHERE user_id = $1', [
            quotes_user_id,
        ]);
        const statusU = 'UPVOTE';
        const vote = this.create({
            status: statusU,
            user_id: user,
            quote_id: quote[0].id,
        });
        await this.save(vote);
    }
    async downvoteQuote(quotes_user_id, user_id) {
        const user = user_id.id;
        const quote = await this.query('SELECT id FROM quote WHERE user_id = $1', [
            quotes_user_id,
        ]);
        const statusU = 'DOWNVOTE';
        const vote = this.create({
            status: statusU,
            user_id: user,
            quote_id: quote[0].id,
        });
        await this.save(vote);
    }
    async deleteVote(quotes_user_id, user_id) {
        const user = user_id.id;
        const quote = await this.query('SELECT id FROM quote WHERE user_id = $1', [
            quotes_user_id,
        ]);
        const vote = await this.query('DELETE FROM vote WHERE user_id = $1 AND quote_id = $2', [user, quote[0].id]);
        if (vote.affected == 0) {
            throw new common_1.NotFoundException(`Vote not fund`);
        }
    }
    async getUserVotes(user_id) {
        const found = await this.query('SELECT u.email, q.karma FROM public."user" u INNER JOIN public."quote" q ON q.user_id = u.Id WHERE u.id = $1 ', [user_id]);
        if (!found) {
            throw new common_1.NotFoundException(`Vote not found`);
        }
        return found;
    }
    async getLikesList(user_id) {
        const found = await this.query("SELECT u.email, q.text, q.karma FROM public.vote v INNER JOIN public.quote q ON v.quote_id = q.Id INNER JOIN public.user u ON q.user_id = u.Id WHERE v.user_id = $1 AND v.status = 'UPVOTE' ORDER BY q.karma DESC", [user_id.id]);
        if (!found) {
            throw new common_1.NotFoundException(`Votes not found`);
        }
        return found;
    }
    async getQuotesList() {
        const found = await this.query('SELECT u.email, q.text, q.karma FROM public."user" u INNER JOIN public."quote" q ON q.user_id = u.Id ORDER BY q.karma DESC');
        if (!found) {
            throw new common_1.NotFoundException(`Vote not found`);
        }
        return found;
    }
};
VoteRepository = __decorate([
    (0, typeorm_1.EntityRepository)(vote_entity_1.Vote)
], VoteRepository);
exports.VoteRepository = VoteRepository;
//# sourceMappingURL=vote.repository.js.map