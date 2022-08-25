import { ConflictException, NotFoundException } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { Vote } from '../../entities/vote.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Vote)
export class VoteRepository extends Repository<Vote> {
  // Gets users votes
  async voteStatusCheck(user_id: string, user: User): Promise<string> {
    let status = 'NEUTRAL';
    const quote = await this.query('SELECT id FROM quote WHERE user_id = $1', [
      user_id,
    ]);
    const upVote = await this.query(
      "SELECT id FROM vote WHERE status ='UPVOTE' AND user_id = $1 AND quote_id = $2",
      [user.id, quote[0].id],
    );
    const downVote = await this.query(
      "SELECT id FROM vote WHERE status ='DOWNVOTE' AND user_id = $1 AND quote_id = $2",
      [user.id, quote[0].id],
    );

    if (upVote.length > 0) {
      status = 'UPVOTE';
    } else if (downVote.length > 0) {
      status = 'DOWNVOTE';
    }

    return status;
  }

  // Creates upvote on quote
  async upvoteQuote(user_id: string, user: User): Promise<void> {
    const quote = await this.query('SELECT id FROM quote WHERE user_id = $1', [
      user_id,
    ]);
    const vote = await this.query(
      "SELECT id FROM vote WHERE status ='UPVOTE' AND user_id = $1 AND quote_id = $2",
      [user.id, quote[0].id],
    );
    if (vote.length < 1) {
      const upVote = this.create({
        status: 'UPVOTE',
        user_id: user.id,
        quote_id: quote[0].id,
      });
      await this.save(upVote);
      //return true;
    } else {
      throw new ConflictException('You cannot upvote one quote twice!');
      //return false;
    }
  }

  // Creates upvote on quote
  async downvoteQuote(user_id: string, user: User): Promise<void> {
    const quote = await this.query('SELECT id FROM quote WHERE user_id = $1', [
      user_id,
    ]);
    const vote = await this.query(
      "SELECT id FROM vote WHERE status ='DOWNVOTE' AND user_id = $1 AND quote_id = $2",
      [user.id, quote[0].id],
    );
    if (vote.length < 1) {
      const downVote = this.create({
        status: 'DOWNVOTE',
        user_id: user.id,
        quote_id: quote[0].id,
      });
      await this.save(downVote);
    } else {
      throw new ConflictException('You cannot downvote one quote twice!');
    }
  }

  // Delete vote quote with
  async deleteVote(user_id: string, user: User): Promise<void> {
    const quote = await this.query('SELECT id FROM quote WHERE user_id = $1', [
      user_id,
    ]);
    const vote = await this.query(
      'DELETE FROM vote WHERE user_id = $1 AND quote_id = $2',
      [user.id, quote[0].id],
    );
    if (vote[1] < 1) {
      throw new NotFoundException(`Vote not fund`);
    }
  }

  // Gets users votes
  async getUserVotes(user_id: string): Promise<Vote> {
    const found = await this.query(
      "SELECT u.id AS userid, q.karma, q.text, u.name, u.surname FROM public.vote v INNER JOIN public.quote q ON v.quote_id = q.Id INNER JOIN public.user u ON q.user_id = u.Id WHERE v.user_id = $1 AND v.status = 'UPVOTE' ORDER BY q.karma DESC",
      [user_id],
      /*'SELECT u.id, u.email, u.name, u.surname, q.text, q.karma FROM public."user" u INNER JOIN public."quote" q ON q.user_id = u.Id WHERE u.id = $1 ',
      [user_id],*/
    );

    if (!found) {
      throw new NotFoundException(`Vote not found`);
    }

    return found;
  }

  // Gets all liked quotes by user descending by karma
  async getLikesList(): Promise<Vote> {
    const found = await this.query(
      'SELECT u.id AS userid, q.text, q.karma, u.name, u.surname FROM public."user" u INNER JOIN public."quote" q ON q.user_id = u.Id ORDER BY q.karma DESC',
    );

    if (!found) {
      throw new NotFoundException(`Votes not found`);
    }

    return found;
  }

  // Gets quote
  async getRecentQuotes(): Promise<Vote> {
    const found = await this.query(
      'SELECT u.id AS userid, q.text, q.karma, u.name, u.surname FROM public."user" u INNER JOIN public."quote" q ON q.user_id = u.Id ORDER BY q.creation_date DESC',
    );

    if (!found) {
      throw new NotFoundException(`Vote not found`);
    }

    return found;
  }
}
