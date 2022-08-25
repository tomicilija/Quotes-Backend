import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import * as bcrypt from 'bcrypt';
import { getConnection, getRepository } from 'typeorm';
import { QuoteModule } from '../../src/modules/quote/quote.module';
import { Quote } from '../../src/entities/quote.entity';
import { AppModule } from '../../src/app.module';
import { CreateQuoteDto } from '../../src/modules/quote/dto/createQuote.dto';
import { User } from '../../src/entities/user.entity';
import { CreateUserDto } from '../../src/modules/auth/dto/createUser.dto';
import { LoginUserDto } from '../../src/modules/auth/dto/loginUser.dto';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let mod: TestingModule;
  let jwt: string;
  let initialQuoteData: Quote;
  let initialUserData: User;

  // before we run tests we add user to database
  beforeAll(async () => {
    mod = await Test.createTestingModule({
      imports: [AppModule, QuoteModule],
    }).compile();
    app = mod.createNestApplication();
    await app.init();

    // DB interaction

    //Hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('Test123!', salt);

    const userRepo = await getRepository(User);
    let testUser = userRepo.create({
      email: 'test1@gmail.com',
      pass: hashedPassword,
      name: 'Test',
      surname: 'User',
    });
    testUser = await userRepo.save(testUser);
    initialUserData = testUser;

    const quoteRepo = await getRepository(Quote);
    let testQuote = quoteRepo.create({
      text: 'Test quote',
      karma: 0,
      creation_date: new Date(),
      user_id: initialUserData,
    });
    testQuote = await quoteRepo.save(testQuote);
    initialQuoteData = testQuote;
  });

  // after all tests are run we delete all tables in database.  TODO --> change to delete only entred values  OR  Separate environment
  afterAll(async () => {
    try {
      const entities = [];
      getConnection().entityMetadatas.forEach((x) =>
        entities.push({ name: x.name, tableName: x.tableName }),
      );
      for (const entity of entities) {
        const repository = getRepository(entity.name);
        await repository.query(`TRUNCATE TABLE "${entity.tableName}" cascade;`);
      }
    } catch (error) {
      throw new Error(`ERROR: Cleaning test db: ${error}`);
    }
    await app.close();
  });

  // Test sings up new user
  it('/signup (POST)', async () => {
    const dto: CreateUserDto = {
      email: 'mockuser1@gmail.com',
      pass: 'Mock123!',
      name: 'Mock',
      surname: 'User',
    };
    await request(app.getHttpServer()).post('/signup').send(dto).expect(201);
  });

  // Test perform login of a existing user
  it('/login (POST)', async () => {
    const dto: LoginUserDto = {
      email: 'mockuser1@gmail.com',
      pass: 'Mock123!',
    };
    await request(app.getHttpServer())
      .post('/login')
      .expect('Content-Type', /json/)
      .send(dto)
      .expect(201)
      .then((res) => {
        jwt = res.body.accessToken;
        expect(res.body).toEqual({
          accessToken: expect.any(String),
        });
        jwt = res.body.accessToken;
        //console.log(jwt);
      });
  });

  // Test tries to create new quote without authorization
  it('/myquote (POST)) --> no authoriation 401 on validation error', async () => {
    const dto: CreateQuoteDto = {
      text: 'Motivoational quote',
    };
    await request(app.getHttpServer()).post('/myquote').send(dto).expect(401);
  });

  // Test tries to get users quote without authorization
  it('/myquote (GET) --> no authoriation 401 on validation error', async () => {
    await request(app.getHttpServer()).get('/myquote').expect(401);
  });

  // Test tries to update users quote without authorization
  it('/myquote (PATCH) --> no authoriation 401 on validation error', async () => {
    const dto: CreateQuoteDto = {
      text: 'Updated Motivoational quote',
    };
    await request(app.getHttpServer()).patch('/myquote').send(dto).expect(401);
  });

  // Test tries to delete created users quote without authorization
  it('/myquote (DELETE) --> no authoriation 401 on validation error', async () => {
    await request(app.getHttpServer()).delete(`/myquote`).expect(401);
  });

  // Test creates new quote
  it('/myquote (POST)', async () => {
    const dto: CreateQuoteDto = {
      text: 'Motivoational quote',
    };
    await request(app.getHttpServer())
      .post('/myquote')
      .set({ Authorization: `Bearer ${jwt}` })
      .send(dto)
      .expect(201);
  });

  // Test gets users quote
  it('/myquote (GET)', async () => {
    await request(app.getHttpServer())
      .get('/myquote')
      .set({ Authorization: `Bearer ${jwt}` })
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          text: 'Motivoational quote',
          karma: 0,
          creation_date: expect.any(String),
        });
      });
  });

  // Test updates users quote
  it('/myquote (PATCH)', async () => {
    const dto: CreateQuoteDto = {
      text: 'Updated Motivoational quote',
    };
    await request(app.getHttpServer())
      .patch('/myquote')
      .set({ Authorization: `Bearer ${jwt}` })
      .send(dto)
      .expect(200);
  });

  // Test upvotes a quote
  it('/user/:id/upvote/ (POST)', async () => {
    await request(app.getHttpServer())
      .post(`/user/${initialUserData.id}/upvote/`)
      .set({ Authorization: `Bearer ${jwt}` })
      .expect(201);
  });

  // Test deleting upvote quote
  it('/user/:id/upvote/  (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/user/${initialUserData.id}/upvote/`)
      .set({ Authorization: `Bearer ${jwt}` })
      .expect(200);
  });

  // Test downvotes a quote
  it('/user/:id/downvote (POST)', async () => {
    await request(app.getHttpServer())
      .post(`/user/${initialUserData.id}/downvote`)
      .set({ Authorization: `Bearer ${jwt}` })
      .expect(201);
  });

  // Test deleting downvote quote
  it('/user/:id/downvote (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/user/${initialUserData.id}/downvote`)
      .set({ Authorization: `Bearer ${jwt}` })
      .expect(200);
  });

  // Test gets user and his votes
  it('/user/:id (GET)', async () => {
    await request(app.getHttpServer())
      .get(`/user/${initialUserData.id}`)
      .set({ Authorization: `Bearer ${jwt}` })
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual([
          {
            email: 'test1@gmail.com',
            karma: 0,
          },
        ]);
      });
  });

  // Test gets all quotes
  it('/list (GET)', async () => {
    await request(app.getHttpServer())
      .get('/list')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual([
          {
            email: 'mockuser1@gmail.com',
            text: 'Updated Motivoational quote',
            karma: 0,
          },
          {
            email: 'test1@gmail.com',
            text: 'Test quote',
            karma: 0,
          },
        ]);
      });
  });

  // Test upvotes a quote
  it('/user/:id/upvote/ (POST)', async () => {
    await request(app.getHttpServer())
      .post(`/user/${initialUserData.id}/upvote/`)
      .set({ Authorization: `Bearer ${jwt}` })
      .expect(201);
  });

  // Test gets users liked quotes
  it('/likes (GET)', async () => {
    await request(app.getHttpServer())
      .get('/likes')
      .set({ Authorization: `Bearer ${jwt}` })
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual([
          {
            email: 'test1@gmail.com',
            karma: 1,
            text: 'Test quote',
          },
        ]);
      });
  });

  // Test deleting created users quote
  it('/myquote (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/myquote`)
      .set({ Authorization: `Bearer ${jwt}` })
      .expect(200);
  });
});
