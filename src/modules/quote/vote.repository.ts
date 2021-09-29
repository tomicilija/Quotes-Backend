import { NotFoundException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Vote } from 'src/entities/vote.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Vote)
export class VoteRepository extends Repository<Vote> {
  // Creates upvote on quote
  async upvoteQuote(quotes_user_id: string, user_id: User): Promise<void> {
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
    //console.log(vote);
  }

  // Creates upvote on quote
  async downvoteQuote(quotes_user_id: string, user_id: User): Promise<void> {
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
    //console.log(vote);
  }

  // Delete downvote quote with
  async deleteVote(quotes_user_id: string, user_id: User): Promise<void> {
    const user = user_id.id;
    const quote = await this.query('SELECT id FROM quote WHERE user_id = $1', [
      quotes_user_id,
    ]);
    const vote = await this.query(
      'DELETE FROM vote WHERE user_id = $1 AND quote_id = $2',
      [user, quote[0].id],
    );
    if (vote.affected == 0) {
      throw new NotFoundException(`Vote not fund`);
    }
  }

  // Gets users votes
  async getUserVotes(user_id: string): Promise<Vote> {
    const found = await this.query(
      'SELECT u.email, q.karma FROM public."user" u INNER JOIN public."quote" q ON q.user_id = u.Id WHERE u.id = $1 ',
      [user_id],
    );

    if (!found) {
      throw new NotFoundException(`Vote not found`);
    }

    return found;
  }

  // Gets all liked quotes by user descending by karma
  async getLikesList(user_id: User): Promise<Vote> {
    const found = await this.query(
      "SELECT u.email, q.text, q.karma FROM public.vote v INNER JOIN public.quote q ON v.quote_id = q.Id INNER JOIN public.user u ON q.user_id = u.Id WHERE v.user_id = $1 AND v.status = 'UPVOTE' ORDER BY q.karma DESC",
      [user_id.id],
    );

    if (!found) {
      throw new NotFoundException(`Votes not found`);
    }

    return found;
  }

  // Gets quote
  async getQuotesList(): Promise<Vote> {
    const found = await this.query(
      'SELECT u.email, q.text, q.karma FROM public."user" u INNER JOIN public."quote" q ON q.user_id = u.Id ORDER BY q.karma DESC',
    );

    if (!found) {
      throw new NotFoundException(`Vote not found`);
    }

    return found;
  }
}
