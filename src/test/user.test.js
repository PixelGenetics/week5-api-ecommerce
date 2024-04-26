const request = require('supertest')
const app = require("../app")

const BASE_URL = '/api/v1/users'

let TOKEN, userId;

beforeAll(async() =>{
    const user = {
        email:"analisa@gmail.com",
        password:"kamskdsa"
    }

    const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(user)

    // console.log(res.body.token);
    TOKEN = res.body.token;
})

test("GET => BASE_URL, should return statusCode 200, and res.body.length === 1", async() =>{
    const res = await request(app)
        .get(BASE_URL)
        .set('authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("POST => BASE_URL, should return statusCode 201, and res.body.body.firstName === user.firstName",async()=>{
    const user = {
        firstName: "Antonio",
        lastName:"Gutierrez",
        email:"AG@gmail.com",
        password:"amsdksm",
        phone:"123123"
    }

    const res = await request(app)
        .post(BASE_URL)
        .send(user)

    userId = res.body.id;

        expect(res.statusCode).toBe(201)
        expect(res.body).toBeDefined()
        expect(res.body.firstName).toBe(user.firstName)
})

test("PUT => 'BASE_URL/:id', should return status code 200, res.body.firstName === userUpdate.lastName", async() => {
    const userUpdate = {
        lastName: "Andre"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${userId}`)
        .send(userUpdate)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.lastName).toBe(userUpdate.lastName)
})

test("POST => 'BASE_URL/login', should return statusCode(200), and res.body.email === user.email and res.body.token to be defined", async() =>{
    const user = {
        email:"AG@gmail.com",
        password:"amsdksm",
    }
    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(user)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.user.email).toBe(user.email)
    expect(res.body.token).toBeDefined()
})

test("Delete => 'BASE_URL/:id', shoudl return statusCode 204", async() => {
    const res = request(app)
    .delete(`${BASE_URL}/${userId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect((await res).statusCode).toBe(204)
})

// const resBody = {
//     user:{
//         firstName: "",
//         lastName: "",
//         email: ""
//     },
//     token: ""
// }