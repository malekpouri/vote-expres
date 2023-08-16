import request from 'supertest';
import { app } from '../src/api';
import { canCreateProgram } from '../src/controller/program/create-program';
import { createPlanTest ,loginUserTest } from './utility';

describe('Program', () => {

    describe('create program', () => {
        it('should be faild if did not logged in', async () => {
            await request(app).post('/program').expect(401);
        });
        it('should be success if logged in', async () => {
            const repResponse: any = await loginUserTest("rep","rep");
            const adminResponse: any = await loginUserTest("admin","admin");
            const todate = new Date();
            const tomarow = new Date(todate.setDate(todate.getDate() + 1));
            const plan = await createPlanTest(adminResponse,'Bandar Abbas',200,tomarow);
            const program = await request(app)
                .post('/program')
                .set('Authorization', repResponse.id)
                .send({
                    title: 'Bandar Abbas',
                    description: 'trip free to Bandar Abbas',
                    deadline: new Date().setDate(new Date().getDate() +1),
                    planId: plan.body.id,
                    userId: repResponse.id
                })
                .expect(200);
            expect(program.body.title).toBe('Bandar Abbas');
        });

        it('should be faild if title is empty', async () => {
            const repResponse: any = await loginUserTest("rep","rep");
            const adminResponse: any = await loginUserTest("admin","admin");
            const todate = new Date();
            const tomarow = new Date(todate.setDate(todate.getDate() + 1));
            const plan = await createPlanTest(adminResponse,'Bandar Abbas',200,tomarow);
            
            await request(app)
                .post('/program')
                .set('Authorization', repResponse.id)
                .send({
                    title: '',
                    description: 'trip free to Bandar Abbas',
                    deadline: new Date().setDate(new Date().getDate() +1),
                    planId: plan.body.id
                })
                .expect(400);
        }
        );
        it('should be faild if deadline is empty', async () => {
            const repResponse: any = await loginUserTest("rep","rep");
            const adminResponse: any = await loginUserTest("admin","admin");
            const todate = new Date();
            const tomarow = new Date(todate.setDate(todate.getDate() + 1));
            const plan = await createPlanTest(adminResponse,'Bandar Abbas',200,tomarow);
            await request(app)
                .post('/program')
                .set('Authorization', repResponse.id)
                .send({
                    title: 'Bandar Abbas',
                    description: 'trip free to Bandar Abbas',
                    deadline: '',
                    planId: plan.body.id
                })
                .expect(400);
        }
        );
        it('should be faild if deadline is undefined', async () => {
            const repResponse: any = await loginUserTest("rep","rep");
            const adminResponse: any = await loginUserTest("admin","admin");
            const todate = new Date();
            const tomarow = new Date(todate.setDate(todate.getDate() + 1));
            const plan = await createPlanTest(adminResponse,'Bandar Abbas',200,tomarow);
            await request(app)
                .post('/program')
                .set('Authorization', repResponse.id)
                .send({
                    title: 'Bandar Abbas',
                    description: 'trip free to Bandar Abbas',
                    deadline: undefined,
                    planId: plan.body.id
                })
                .expect(400);
        }
        );
        it('should be faild if deadline is null', async () => {
            const repResponse: any = await loginUserTest("rep","rep");
            const adminResponse: any = await loginUserTest("admin","admin");
            const todate = new Date();
            const tomarow = new Date(todate.setDate(todate.getDate() + 1));
            const plan = await createPlanTest(adminResponse,'Bandar Abbas',200,tomarow);
            await request(app)
                .post('/program')
                .set('Authorization', repResponse.id)
                .send({
                    title: 'Bandar Abbas',
                    description: 'trip free to Bandar Abbas should be faild if deadline is null',
                    deadline: null,
                    planId: plan.body.id
                })
                .expect(400);
        }
        );
        it('should be success if deadline is valid', async () => {
            const repResponse: any = await loginUserTest("rep","rep");
            const adminResponse: any = await loginUserTest("admin","admin");
            const todate = new Date();
            const tomarow = new Date(todate.setDate(todate.getDate() + 1));
            const plan = await createPlanTest(adminResponse,'Bandar Abbas',200,tomarow);
            const program = await request(app)
                .post('/program')
                .set('Authorization', repResponse.id)
                .send({
                    title: 'Bandar Abbas',
                    description: 'trip free to Bandar Abbas should be success if deadline is valid',
                    deadline: tomarow,
                    planId: plan.body.id,
                    userId: repResponse.id
                })
                .expect(200);
            expect(program.body.title).toBe('Bandar Abbas');
        }
        );
        it('should be faild if deadline is exeeded', async () => {
            const repResponse: any = await loginUserTest("rep","rep");
            const adminResponse: any = await loginUserTest("admin","admin");
            const todate = new Date();
            const tomarow = new Date(todate.setDate(todate.getDate() + 1));
            const yesterday = new Date(todate.setDate(todate.getDate() - 1));
            const plan = await createPlanTest(adminResponse,'Bandar Abbas',200,tomarow);
            await request(app)
                .post('/program')
                .set('Authorization', repResponse.id)
                .send({
                    title: plan.body.title,
                    description: plan.body.description,
                    planId: plan.body.id,
                    deadline: yesterday
                })
                .expect(400);
        }
        );
        it('should not create program if user already have a a program', async () => {
            expect(canCreateProgram(
                {
                    id:'1',
                    username:"rep",
                    password:"rep",
                    role:"Representative",
                },
                {
                    id:1,
                    title:"title",
                    description:"description",
                    deadline:new Date(),
                    programs:[{
                        id:1,
                        title:"title",
                        description:"description",
                        deadline:new Date(),
                        planId:1,
                        userId:'1'
                    }]

                })).toBe(false)
            
        }
        );

    });
});
