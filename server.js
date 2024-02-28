const express = require("express");
const {faker} = require('@faker-js/faker')
const app = express();
const port = 8000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const newUserObj =  () => ({
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    password: faker.internet.password(),
})

const newCompanyObj = () => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipcode: faker.location.zipcode(),
        country: faker.location.country(),
    },
});

app.get("/api/users/new", (req, res) => {
    const newUser = newUserObj();
    res.json(newUser);
});

app.get("/api/companies/new",(req, res) => {
    const newCompany = newCompanyObj();
    res.json(newCompany);
});

app.get("/api/user/company", (req, res) => {
    const newUser = newUserObj();
    const newCompany = newCompanyObj();
    const newObject = {
        user: newUser,
        company: newCompany,
    };
    res.json(newObject);
});


app.listen( port, () => console.log(`Listening on port: ${port}`) );
