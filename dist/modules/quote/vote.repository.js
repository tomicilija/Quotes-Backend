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
    async voteStatusCheck(user_id, user) {
        let status = 'NEUTRAL';
        const quote = await this.query('SELECT id FROM quote WHERE user_id = $1', [
            user_id,
        ]);
        const upVote = await this.query("SELECT id FROM vote WHERE status ='UPVOTE' AND user_id = $1 AND quote_id = $2", [user.id, quote[0].id]);
        const downVote = await this.query("SELECT id FROM vote WHERE status ='DOWNVOTE' AND user_id = $1 AND quote_id = $2", [user.id, quote[0].id]);
        if (upVote.length > 0) {
            status = 'UPVOTE';
        }
        else if (downVote.length > 0) {
            status = 'DOWNVOTE';
        }
        return status;
    }
    async upvoteQuote(user_id, user) {
        const quote = await this.query('SELECT id FROM quote WHERE user_id = $1', [
            user_id,
        ]);
        const vote = await this.query("SELECT id FROM vote WHERE status ='UPVOTE' AND user_id = $1 AND quote_id = $2", [user.id, quote[0].id]);
        if (vote.length < 1) {
            const upVote = this.create({
                status: 'UPVOTE',
                user_id: user.id,
                quote_id: quote[0].id,
            });
            await this.save(upVote);
        }
        else {
            throw new common_1.ConflictException('You cannot upvote one quote twice!');
        }
    }
    async downvoteQuote(user_id, user) {
        const quote = await this.query('SELECT id FROM quote WHERE user_id = $1', [
            user_id,
        ]);
        const vote = await this.query("SELECT id FROM vote WHERE status ='DOWNVOTE' AND user_id = $1 AND quote_id = $2", [user.id, quote[0].id]);
        if (vote.length < 1) {
            const downVote = this.create({
                status: 'DOWNVOTE',
                user_id: user.id,
                quote_id: quote[0].id,
            });
            await this.save(downVote);
        }
        else {
            throw new common_1.ConflictException('You cannot downvote one quote twice!');
        }
    }
    async deleteVote(user_id, user) {
        const quote = await this.query('SELECT id FROM quote WHERE user_id = $1', [
            user_id,
        ]);
        const vote = await this.query('DELETE FROM vote WHERE user_id = $1 AND quote_id = $2', [user.id, quote[0].id]);
        if (vote[1] < 1) {
            throw new common_1.NotFoundException(`Vote not fund`);
        }
    }
    async getUserVotes(user_id) {
        const found = await this.query("SELECT u.id AS userid, q.karma, q.text, u.name, u.surname FROM public.vote v INNER JOIN public.quote q ON v.quote_id = q.Id INNER JOIN public.user u ON q.user_id = u.Id WHERE v.user_id = $1 AND v.status = 'UPVOTE' ORDER BY q.karma DESC", [user_id]);
        if (!found) {
            throw new common_1.NotFoundException(`Vote not found`);
        }
        return found;
    }
    async getLikesList() {
        const found = await this.query('SELECT u.id AS userid, q.text, q.karma, u.name, u.surname FROM public."user" u INNER JOIN public."quote" q ON q.user_id = u.Id ORDER BY q.karma DESC');
        if (!found) {
            throw new common_1.NotFoundException(`Votes not found`);
        }
        return found;
    }
    async getRecentQuotes() {
        const found = await this.query('SELECT u.id AS userid, q.text, q.karma, u.name, u.surname FROM public."user" u INNER JOIN public."quote" q ON q.user_id = u.Id ORDER BY q.creation_date DESC');
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