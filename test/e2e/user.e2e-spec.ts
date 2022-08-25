import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import * as bcrypt from 'bcrypt';
import { getConnection, getRepository } from 'typeorm';
import { AuthModule } from '../../src/modules/auth/auth.module';
import { User } from '../../src/entities/user.entity';
import { AppModule } from '../../src/app.module';
import { CreateUserDto } from '../../src/modules/auth/dto/createUser.dto';
import { LoginUserDto } from '../../src/modules/auth/dto/loginUser.dto';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let mod: TestingModule;
  let jwt: string;
  let initialUserData: User;

  // before we run tests we add user to database
  beforeAll(async () => {
    mod = await Test.createTestingModule({
      imports: [AppModule, AuthModule],
    }).compile();

    app = mod.createNestApplication();
    await app.init();

    // DB interaction

    //Hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('Test123!', salt);

    const userRepo = await getRepository(User);
    let testUser = userRepo.create({
      email: 'test@gmail.com',
      pass: hashedPassword,
      name: 'Test',
      surname: 'User',
    });
    testUser = await userRepo.save(testUser);
    initialUserData = testUser;
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

  // Test tries if error mesaage would appear if we acces user without authentication
  it('/me (GET) --> empty 401 on validation error', async () => {
    await request(app.getHttpServer()).get('/me').expect(401);
  });

  // Test tries if error mesaage would appear if we signup without data
  it('/signup (POST) --> empty 400 on bad request', async () => {
    await request(app.getHttpServer())
      .post('/signup')
      .expect('Content-Type', /json/)
      .expect(400);
  });

  // Test tries if error mesaage would appear if we create user with wrong email format or wrong password format
  it('/signup (POST) --> wrong format / too week password 400 on bad request', async () => {
    const dto: CreateUserDto = {
      email: 'mock',
      pass: 'cock',
      name: 'Mock',
      surname: 'User',
    };
    await request(app.getHttpServer()).post('/signup').send(dto).expect(400);
  });

  // Test tries if error mesaage would appear if we login with wrong credentials
  it('/login (POST) --> wrong credentials 401 on validation error', async () => {
    const dto: LoginUserDto = {
      email: 'test',
      pass: 'tesst!',
    };
    await request(app.getHttpServer())
      .post('/login')
      .expect('Content-Type', /json/)
      .send(dto)
      .expect(401);
  });

  // Test sings up new user
  it('/signup (POST)', async () => {
    const dto: CreateUserDto = {
      email: 'mockuser@gmail.com',
      pass: 'Mock123!',
      name: 'Mock',
      surname: 'User',
    };
    await request(app.getHttpServer()).post('/signup').send(dto).expect(201);
  });

  // Test perform login of a existing user
  it('/login (POST)', async () => {
    const dto: LoginUserDto = {
      email: 'mockuser@gmail.com',
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
      });
  });

  it('/me (GET)', async () => {
    await request(app.getHttpServer())
      .get('/me')
      .set({ Authorization: `Bearer ${jwt}` })
      .expect(200);
  });

  it('/me/update-password (PATCH)', async () => {
    const dto: CreateUserDto = {
      email: 'mockuser@gmail.com',
      pass: 'Update-Mock123!',
      name: 'MockU',
      surname: 'UserU',
    };
    await request(app.getHttpServer())
      .patch('/me/update-password')
      .set({ Authorization: `Bearer ${jwt}` })
      .expect('Content-Type', /json/)
      .send(dto)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          email: 'mockuser@gmail.com',
          pass: expect.any(String),
          name: 'MockU',
          surname: 'UserU',
        });
      });
  });

  it('/me (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/me`)
      .set({ Authorization: `Bearer ${jwt}` })
      .expect(200);
  });
});
