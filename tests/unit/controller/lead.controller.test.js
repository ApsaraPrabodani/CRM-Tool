const request = require('supertest');
const app = require('../../../app');
const { locales } = require('../../../locales');
const dbConnection = require('../../../models');
const Lead = dbConnection.leads;


const leadsEndpoint = '/api/v1/leads';

const sendCreateLeadRequest = async (body) => {
    return await request(app)
        .post(`${leadsEndpoint}`)
        .send(body);
};

describe('Lead Controller', () => {
    describe('POST /leads', () => {
        describe('Request validations', () => {
            it('it should return 422 for non numeric id', async () => {
                const response = await sendCreateLeadRequest(
                    {}
                );

                expect(response.status).toBe(422);
                expect(response.body).toEqual(
                    expect.objectContaining({
                        message: expect.objectContaining({
                            id: locales.__(
                                'messages.validation.attribute_is_numeric',
                                {
                                    attribute: 'id'
                                }
                            )
                        })
                    })
                );
            });
        });
        // describe('Delete function', () => {
        //     let newTaskId;
        //     beforeAll(async () => {
        //         const firstTask = await Task.create({ title: 'Test_Title', 'description': 'Test description', 'status': 'pending'});
        //         newTaskId = firstTask.id;
        //         console.log('newTaskId: ', newTaskId);
        //     });

        //     it('should delete task details with valid ID', async () => {
        //         expect(newTaskId).toBeDefined();
        //         const response = await sendDeleteTaskRequest(
        //             newTaskId
        //         );
    
        //         const deletedTask = await Task.findOne({where : { id:  newTaskId}, raw: true});
        //         expect(response.status).toBe(200);
        //         expect(response.body).toHaveProperty('message');
        //         expect(response.body).toHaveProperty('success');
        //         expect(response.body.success).toEqual(true);
        //         expect(response.body.message).toEqual(locales.__('message.success.task_delete'));
        //         expect(deletedTask).toBe(null); //check whether task deleted or not
        //     });
        // })
       
    });
});
