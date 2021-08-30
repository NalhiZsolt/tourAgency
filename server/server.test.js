require('dotenv').config()
const mongoose = require("mongoose");
const config = require("config");
const dbConfig = config.get("database");
const supertest = require("supertest");
const app = require("./server");
const Travellers = require("./models/travellers");
const Tours = require("./models/tours");
const Guides = require("./models/guides");
const Descriptions = require("./models/descriptions");
const Token = require("./models/token.model");

describe("REST API integration test", () => {
  const descriptionsData = [
    {
      value: "bekesi_jaras",
      name: "Békési járás",
      description1: "Békési járás leírás 1",
      description2: "Békési járás leírás 2",
      description3: "Békési járás leírás 3",
      header1: "Békési header 1",
      header2: "Békési header 1",
      header3: "Békési header 1",
      img1: "http://bekes1.jpg",
      img2: "http://bekes2.jpg",
      img3: "http://bekes3.jpg",
    },
    {
      value: "borsodi_jaras",
      name: "Borsodi járás",
      description1: "Borsodi járás leírás 1",
      description2: "Borsodi járás leírás 2",
      description3: "Borsodi járás leírás 3",
      header1: "Borsodi header 1",
      header2: "Borsodi header 1",
      header3: "Borsodi header 1",
      img1: "http://borsod1.jpg",
      img2: "http://borsod2.jpg",
      img3: "http://borsod3.jpg",
    },
    {
      value: "zempleni_jaras",
      name: "Zempléni járás",
      description1: "Zempléni járás leírás 1",
      description2: "Zempléni járás leírás 2",
      description3: "Zempléni járás leírás 3",
      header1: "Zempléni header 1",
      header2: "Zempléni header 1",
      header3: "Zempléni header 1",
      img1: "http://zempleni1.jpg",
      img2: "http://zempleni2.jpg",
      img3: "http://zempleni3.jpg",
    },
  ];

  const guidesData = [
    {
      first_name: "John",
      last_name: "Doe",
      age: 20,
      image: "http://valamilyen.image.jpg",
      description1: "description1",
      description2: "description2",
      tours: [],
    },
    {
      first_name: "Jane",
      last_name: "Doe",
      age: 25,
      image: "http://valamilyen.image2.jpg",
      description1: "description Jane",
      description2: "description Jane",
      tours: [],
    },
    {
      first_name: "John",
      last_name: "Williams",
      age: 23,
      image: "http://valamilyen.image3.jpg",
      description1: "description John Williams",
      description2: "description John Williams",
      tours: [],
    },
  ];

  const toursData = [
    {
      tour_title: "Első túra neve",
      tour_description: "Első túra leírás 1",
      tour_description2: "Első túra leírás 2",
      tour_description3: "Első túra leírás 3",
      tour_type: "Öko túra",
      tour_location: "Szeged",
      tour_start: "2021-07-26T23:41:00.002Z",
      tour_end: "2021-07-27T19:36:13.675Z",
      travellers: [],
      guide: "60ff40193d9e93055c6c0339",
      image: "http://elso_tura_imag.jpg",
    },
    {
      tour_title: "Második túra neve",
      tour_description: "Második túra leírás 1",
      tour_description2: "Második túra leírás 2",
      tour_description3: "Második túra leírás 3",
      tour_type: "Öko túra",
      tour_location: "Szentes",
      tour_start: "2021-07-26T23:41:00.002Z",
      tour_end: "2021-07-27T19:36:13.675Z",
      travellers: [],
      guide: "60ff40193d9e93055c6c0339",
      image: "http://masodik_tura_imag.jpg",
    },
    {
      tour_title: "Harmadik túra neve",
      tour_description: "Harmadik túra leírás 1",
      tour_description2: "Harmadik túra leírás 2",
      tour_description3: "Harmadik túra leírás 3",
      tour_type: "Öko túra",
      tour_location: "Makó",
      tour_start: "2021-07-26T23:41:00.002Z",
      tour_end: "2021-07-27T19:36:13.675Z",
      travellers: [],
      guide: "60ff40193d9e93055c6c0339",
      image: "http://harmadik_tura_imag.jpg",
    },
  ];

  const travellersData = [
    {
      first_name: "Béla",
      last_name: "Kocsis",
      age: 20,
      email: "kovacs@gmail.com",
      gender: "ferfi",
      password: "$2b$10$pysUz5OS79ViHt7ra0yRVuejEY4zg1iSVc9rawBz.FMWDnlb9p7Q.",
      city: "Pécs",
      street: "Kossuth u.",
      houseNumber: 10,
      zip: 1234,
      image: "http://avatar.jpg",
      my_tours: [],
      role: 1,
    },
    {
      first_name: "Imre",
      last_name: "Vass",
      age: 21,
      email: "vass@gmail.com",
      gender: "ferfi",
      password: "$2b$10$shjy2hK6dTbi09b/6z72rO3XAG5eZq1MqfqPyDK.1d/GRHplG37mS",
      city: "Baja",
      street: "Petőfi u.",
      houseNumber: 15,
      zip: 2345,
      image: "http://avatar2.jpg",
      my_tours: [],
      role: 1,
     },
    {
      first_name: "Ilona",
      last_name: "Gulyás",
      age: 22,
      email: "ilona@email.com",
      gender: "nő",
      password: "$2b$10$9GP36tzRI7BLfxyn/7dTnOuHDxutgrlPpM811PhUAlYZ34g4q4WNi",
      city: "Ózd",
      street: "Arany u.",
      houseNumber: 30,
      zip: 3456,
      image: "http://avatar3.jpg",
      my_tours: [],
      role: 3,
    }
  ];

  let validAccesToken;
  let validRefreshToken;
  let validTravellerId
  let validRole;
  let validFirstName;

beforeEach(async () => {
  await mongoose.connect(`${dbConfig.dbType}${dbConfig.username}:${dbConfig.password}@${dbConfig.host}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
  })

  await supertest(app)
  .post('/travellers')
  .send(
    
    {
      first_name: "Admin",
      last_name: "Admin",
      age: 22,
      email: "admin@admin.com",
      gender: "nő",
      password: "admin",
      city: "Ózd",
      street: "Arany u.",
      houseNumber: 30,
      zip: 3456,
      image: "http://avatar3.jpg",
      my_tours: [],
      role: 3,
    },
  )
  .set('Accept', 'application/json')

  const credentials = {
      email: 'admin@admin.com',
      password: 'admin'
  }
 const { body: { _id, accessToken, refreshToken, first_name, role } } = await supertest(app)
      .post('/login')
      .send(credentials)
      .expect(200)
      validRefreshToken = refreshToken;
      validAccessToken = accessToken;
      validCustomerId = _id;
      validRole = role;
      validFirstName = first_name;
});

  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done());
    });
  });

  test("Login test with valid datas", () => {
    const loginData = {
      email: 'vass@gmail.com',
      password: 'password'
    }
    return Travellers.insertMany(travellersData).then(() =>
      supertest(app)
        .post(`/login`)
        .send(loginData)
        .expect(200)
    )
  })

  test("test refresh token is valid or not with valid token", () => {
    
    return Travellers.insertMany(travellersData).then(() =>
      supertest(app)
        .post(`/refresh`)
        .send({ refreshToken: validRefreshToken })
        .set('Authorization', 'Bearer ' + validAccessToken)
        .expect(200)      
    )
  })

  test("logout", () => {
    return Travellers.insertMany(travellersData).then(() =>
      supertest(app)
        .post(`/logout`)
        .send({ refreshToken: validRefreshToken })
        .set('Authorization', 'Bearer ' + validAccessToken)
        .expect(200)      
    )
  })

  test("GET all traveller", () => {
    return Travellers.insertMany(travellersData)
      .then(() => supertest(app).get("/travellers").expect(200))
      .then((response) => {
        const body = response.body;
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toEqual(travellersData.length+1); //egy fő regisztráció útján kerül be ezért +1
      });
  });

  test("GET one traveller by ID - valid ID", () => {
    let idData;
    return Travellers.insertMany(travellersData)
      .then((travellers) => {
        idData = `${travellers[0]._id}`;
        return supertest(app)
          .get(`/travellers/${travellers[0]._id}`)
          .expect(200);
      })
      .then((response) => {
        const body = response.body;
        expect(typeof body === "object").toBeTruthy();
        expect(body.first_name).toBe(travellersData[0].first_name);
        expect(body.last_name).toBe(travellersData[0].last_name);
        expect(body.age).toBe(travellersData[0].age);
        expect(body.email).toBe(travellersData[0].email);
        expect(body.gender).toBe(travellersData[0].gender);
        expect(body.password).toBe(travellersData[0].password);
        expect(body.city).toBe(travellersData[0].city);
        expect(body.street).toBe(travellersData[0].street);
        expect(body.houseNumber).toBe(travellersData[0].houseNumber);
        expect(body.zip).toBe(travellersData[0].zip);
        expect(body.image).toBe(travellersData[0].image);
        expect(body.role).toBe(travellersData[0].role);
        expect(body._id).toBe(idData);
      });
  });

  test("GET one traveller by ID - invalid ID", () => {
    let idData = `123`;
    return Travellers.insertMany(travellersData).then((travellers) => {
      return supertest(app).get(`/travellers/${idData}`).expect(404);
    });
  });

  test("POST one traveller with valid datas", () => {
    const newTraveller = {
      first_name: "Karola",
      last_name: "Kiss",
      email: "kiss@gmail.com",
      age: 23,
      gender: "nő",
      image: "http://avatar4.jpg",
      password: "password",
      city: "Ózd",
      street: "Acél u.",
      houseNumber: 33,
      zip: 3456,
      my_tours: [],
      role: 1,
    };

    return Travellers.insertMany(travellersData)
      .then(() =>
        supertest(app)
          .post(`/travellers`)
          .send(newTraveller)
          .set("Accept", "application/json")
          .expect(201)
      )
      .then((response) => {
        const body = response.body;
        expect(typeof body === "object").toBeTruthy();
        expect(body.first_name).toBe(newTraveller.first_name)
      });
  });

  test("POST one traveller with invalid datas", () => {
    const newTraveller = {
      first_name: 25,
      last_name: false,
      email: "kiss@gmail.com",
      age: 23,
      gender: "nő",
      image: "http://avatar4.jpg",
      password: "password",
      city: "Ózd",
      street: "Acél u.",
      houseNumber: 33,
      zip: 3456,
      my_tours: [],
      role: 1,
    };

    return Travellers.insertMany(travellersData).then(() =>
      supertest(app)
        .post(`/travellers`)
        .send(newTraveller)
        .set("Accept", "application/json")
        .expect(400)
    );
  });

  test("PUT one traveller with valid datas", () => {
    let idData;
    const updateTraveller = {
      first_name: "Jucus",
      last_name: "Fabricius",
      email: "jucus@gmail.com",
      age: 23,
      gender: "nő",
      image: "http://avatar4.jpg",
      password: "password",
      city: "Ózd",
      street: "Acél u.",
      houseNumber: 33,
      zip: 3456,
      my_tours: [],
      role: 1,
    };

    return Travellers.insertMany(travellersData).then((travellers) => {
      idData = `${travellers[0]._id}`;
      return supertest(app)
        .put(`/travellers/${travellers[0]._id}`).set('Authorization', 'Bearer ' + validAccessToken)
        .send(updateTraveller)
        .set("Accept", "application/json")
        .expect(200);
    });
  });
  test("PUT one traveller with valid datas", () => {
    let idData;
    const updateTraveller = {
      first_name: "Jucus",
      last_name: "Fabricius",
      email: "jucus@gmail.com",
      age: 23,
      gender: "nő",
      image: "http://avatar4.jpg",
      password: "newPassword",
      city: "Ózd",
      street: "Acél u.",
      houseNumber: 33,
      zip: 3456,
      my_tours: [],
      role: 1,
    };

    return Travellers.insertMany(travellersData).then((travellers) => {
      idData = `${travellers[0]._id}`;
      return supertest(app)
        .put(`/travellers/${travellers[0]._id}/password`)
        .send(updateTraveller)
        .set("Accept", "application/json")
        .expect(200);
    });
  });

  test("DELETE one traveller with valid datas", () => {
    return Travellers.insertMany(travellersData)
      .then((travellers) => {
        return supertest(app)
          .delete(`/travellers/${travellers[0]._id}`).set('Authorization', 'Bearer ' + validAccessToken)
          .expect(200);
      })
  });

  test("DELETE one traveller with invalid ID", () => {
    let invalidId = 123
    return Travellers.insertMany(travellersData)
      .then((travellers) => {
        return supertest(app)
          .delete(`/travellers/${invalidId}`).set('Authorization', 'Bearer ' + validAccessToken)
          .expect(404);
      })
  });

  test("GET all guide", () => {
    return Guides.insertMany(guidesData)
      .then(() => supertest(app).get("/guides").expect(200))
      .then((response) => {
        const body = response.body;
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toEqual(guidesData.length);
        body.forEach((guide, index) => {
          expect(guide.first_name).toBe(guidesData[index].first_name);
          expect(guide.last_name).toBe(guidesData[index].last_name);
          expect(guide.age).toBe(guidesData[index].age);
          expect(guide.image).toBe(guidesData[index].image);
          expect(guide.description1).toBe(guidesData[index].description1);
          expect(guide.description2).toBe(guidesData[index].description2);
          expect(guide.tours).toStrictEqual(guidesData[index].tours);
        });
      });
  });

  test("GET one guide by ID - valid ID", () => {
    let idData;
    return Guides.insertMany(guidesData)
      .then((guides) => {
        idData = `${guides[0]._id}`;
        return supertest(app)
          .get(`/guides/${guides[0]._id}`)
          .expect(200);
      })
      .then((response) => {
        const guide = response.body;
            expect(typeof guide === "object").toBeTruthy();
            expect(guide.first_name).toBe(guidesData[0].first_name);
            expect(guide.last_name).toBe(guidesData[0].last_name);
            expect(guide.age).toBe(guidesData[0].age);
            expect(guide.image).toBe(guidesData[0].image);
            expect(guide.description1).toBe(guidesData[0].description1);
            expect(guide.description2).toBe(guidesData[0].description2);
            expect(guide.tours).toStrictEqual(guidesData[0].tours);
            expect(guide._id).toBe(idData);
      });
  });

  test("GET one guide by ID - invalid ID", () => {
    let invalidId = `123`;
    return Guides.insertMany(guidesData).then((guides) => {
      return supertest(app).get(`/guides/${invalidId}`).set('Authorization', 'Bearer ' + validAccessToken)
      .expect(404);
    });
  });

  test("POST one guide with valid datas", () => {
    const newGuide = {
        first_name: "Jonny",
        last_name: "Boy",
        age: 50,
        image: "http://valamilyenTökMás.image.jpg",
        description1: "descriptionúj1",
        description2: "descriptionúj2",
        tours: [],
    };

    return Guides.insertMany(guidesData)
      .then(() =>
        supertest(app)
          .post(`/guides`).set('Authorization', 'Bearer ' + validAccessToken)
          .send(newGuide)
          .set("Accept", "application/json")
          .expect(201)
      )
      .then((response) => {
        const body = response.body;
        expect(typeof body === "object").toBeTruthy();
      });
  });

  test("POST one guide with invalid datas", () => {
    const newGuide = {
        first_name: 1,
        last_name: 2,
        age: 'három',
        image: "http://valamilyen.image.jpg",
        description1: "description1",
        description2: "description2",
        tours: [],
    };

    return Guides.insertMany(guidesData).then(() =>
      supertest(app)
        .post(`/guides`).set('Authorization', 'Bearer ' + validAccessToken)
        .send(newGuide)
        .set("Accept", "application/json")
        .expect(500)
    );
  });

  test("PUT one guide with valid datas", () => {
    let idData;
    const updateGuide = {
        first_name: "Johann",
        last_name: "Dowe",
        age: 22,
        image: "http://valamilyen.image.jpg",
        description1: "description1",
        description2: "description2",
        tours: [],
    };

    return Guides.insertMany(guidesData).then((guides) => {
      idData = `${guides[0]._id}`;
      return supertest(app)
        .put(`/guides/${guides[0]._id}`).set('Authorization', 'Bearer ' + validAccessToken)
        .send(updateGuide)
        .set("Accept", "application/json")
        .expect(200);
    });
  });
  test("PUT one guide with invalid ID", () => {
    let invaidId = 123;
    const updateGuide = {
        first_name: "Johann",
        last_name: "Dowe",
        age: 22,
        image: "http://valamilyen.image.jpg",
        description1: "description1",
        description2: "description2",
        tours: [],
    };

    return Guides.insertMany(guidesData).then((guides) => {
      
      return supertest(app)
        .put(`/guides/${invaidId}`).set('Authorization', 'Bearer ' + validAccessToken)
        .send(updateGuide)
        .set("Accept", "application/json")
        .expect(404);
    });
  });

  test("DELETE one guide with valid datas", () => {
    return Guides.insertMany(guidesData)
      .then((guides) => {
        return supertest(app)
          .delete(`/guides/${guides[0]._id}`).set('Authorization', 'Bearer ' + validAccessToken)
          .expect(200);
      })
      
  });
  test("DELETE one guide with invalid ID", () => {
    let invalidId = 123;
    return Guides.insertMany(guidesData)
      .then((guides) => {
        return supertest(app)
          .delete(`/guides/${invalidId}`).set('Authorization', 'Bearer ' + validAccessToken)
          .expect(404);
      })
      
  });

  test("GET all tour", () => {
    return Tours.insertMany(toursData)
      .then(() => supertest(app).get("/tours").expect(200))
      .then((response) => {
        const body = response.body;
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toEqual(toursData.length);
        body.forEach((tour, index) => {
          expect(tour.tour_title).toBe(toursData[index].tour_title);
          expect(tour.tour_description).toBe(toursData[index].tour_description);
          expect(tour.tour_description2).toBe(toursData[index].tour_description2);
          expect(tour.tour_description3).toBe(toursData[index].tour_description3);
          expect(tour.tour_type).toBe(toursData[index].tour_type);
          expect(tour.tour_location).toBe(toursData[index].tour_location);
          expect(tour.tour_start).toBe(toursData[index].tour_start);
          expect(tour.tour_end).toBe(toursData[index].tour_end);
          expect(tour.travellers).toStrictEqual(toursData[index].travellers);
          expect(tour.guide).toBe(toursData[index].guide);
          expect(tour.image).toBe(toursData[index].image);
          
        });
      });
  });

  test("GET one tour by ID - valid ID", () => {
    let idData;
    return Tours.insertMany(toursData)
      .then((tours) => {
        idData = `${tours[0]._id}`;
        return supertest(app)
          .get(`/tours/${tours[0]._id}`).set('Authorization', 'Bearer ' + validAccessToken)
          .expect(200);
      })
      .then((response) => {
        const tour = response.body;
            expect(tour.tour_title).toBe(toursData[0].tour_title);
            expect(tour.tour_description).toBe(toursData[0].tour_description);
            expect(tour.tour_description2).toBe(toursData[0].tour_description2);
            expect(tour.tour_description3).toBe(toursData[0].tour_description3);
            expect(tour.tour_type).toBe(toursData[0].tour_type);
            expect(tour.tour_location).toBe(toursData[0].tour_location);
            expect(tour.tour_start).toBe(toursData[0].tour_start);
            expect(tour.tour_end).toBe(toursData[0].tour_end);
            expect(tour.travellers).toStrictEqual(toursData[0].travellers);
            expect(tour.guide).toBe(toursData[0].guide);
            expect(tour.image).toBe(toursData[0].image);
            expect(tour._id).toBe(idData);
            
      });
  });

  test("GET one tour by ID - invalid ID", () => {
    let invalidId = `123`;
    return Tours.insertMany(toursData).then((guides) => {
      return supertest(app)
        .get(`/tours/${invalidId}`).set('Authorization', 'Bearer ' + validAccessToken)
        .expect(404);
    });
  });

  test("POST one tour with valid datas", () => {
    const newTour = {
        tour_title: "Negyedik túra neve",
        tour_description: "Negyedik túra leírás 1",
        tour_description2: "Negyedik túra leírás 2",
        tour_description3: "Negyedik túra leírás 3",
        tour_type: "Valamilyen túra",
        tour_location: "Szeged",
        tour_start: "2021-09-27T19:36:13.675Z",
        tour_end: "2021-09-28T19:36:13.675Z",
        travellers: [],
        guide: "60ff40193d9e93055c6c0339",
        image: "http://negyedik_tura_imag.jpg"
    };

    return Tours.insertMany(toursData)
      .then(() =>
        supertest(app)
          .post(`/tours`).set('Authorization', 'Bearer ' + validAccessToken)
          .send(newTour)
          .set("Accept", "application/json")
          .expect(201)
      )
      .then((response) => {
        const body = response.body;
        expect(typeof body === "object").toBeTruthy();
      });
  });

  test("POST one tour with invalid datas", () => {
    const newTour = {
        tour_title: 1,
        tour_description: true,
        tour_description2: "Negyedik túra leírás 2",
        tour_description3: "Negyedik túra leírás 3",
        tour_type: "Öko túra",
        tour_location: "Szeged",
        tour_start: "2021-09-27T19:10:13.675Z",
        tour_end: "2021-09-27T19:36:13.675Z",
        travellers: [],
        guide: "60ff40193d9e93055c6c0339",
        image: "http://negyedik_tura_imag.jpg",
    };

    return Tours.insertMany(toursData).then(() =>
      supertest(app)
        .post(`/tours`).set('Authorization', 'Bearer ' + validAccessToken)
        .send(newTour)
        .set("Accept", "application/json")
        .expect(500)
    );
  });

  test("PUT one tour with valid datas", () => {
    let idData;
    const updateTour = {
        tour_title: "Első túra neve",
        tour_description: "Első túra leírás 1",
        tour_description2: "Első túra leírás 2",
        tour_description3: "Első túra leírás 3",
        tour_type: "Öko túra",
        tour_location: "Nem Szeged hanem más",
        tour_start: "2021-09-27T18:36:13.675Z",
        tour_end: "2021-09-27T19:36:13.675Z",
        travellers: [],
        guide: "60ff40193d9e93055c6c0339",
        image: "http://elso_tura_imag.jpg",
    };

    return Tours.insertMany(toursData).then((tours) => {
      idData = `${tours[0]._id}`;
      return supertest(app)
        .put(`/tours/${tours[0]._id}`).set('Authorization', 'Bearer ' + validAccessToken)
        .send(updateTour)
        .set("Accept", "application/json")
        .expect(200);
    });
  });

  test("PUT one tour with invalid datas", () => {
    let invalidId = 123;
    const updateTour = {
        tour_title: "Első túra neve",
        tour_description: "Első túra leírás 1",
        tour_description2: "Első túra leírás 2",
        tour_description3: "Első túra leírás 3",
        tour_type: "Öko túra",
        tour_location: "Nem Szeged hanem más",
        tour_start: "2021-09-27T18:36:13.675Z",
        tour_end: "2021-09-27T19:36:13.675Z",
        travellers: [],
        guide: "60ff40193d9e93055c6c0339",
        image: "http://elso_tura_imag.jpg",
    };

    return Tours.insertMany(toursData).then((tours) => {
     
      return supertest(app)
        .put(`/tours/${invalidId}`).set('Authorization', 'Bearer ' + validAccessToken)
        .send(updateTour)
        .set("Accept", "application/json")
        .expect(404);
    });
  });

  test("DELETE one tour with valid ID", () => {
    return Tours.insertMany(toursData)
      .then((tours) => {
        return supertest(app)
          .delete(`/tours/${tours[0]._id}`).set('Authorization', 'Bearer ' + validAccessToken)
          .expect(200);
      })
  });

  test("DELETE one tour with invalid ID", () => {
    let invalidId = 123
    return Tours.insertMany(toursData)
      .then((tours) => {
        return supertest(app)
          .delete(`/tours/${invalidId}`).set('Authorization', 'Bearer ' + validAccessToken)
          .expect(404);
      })
  });

  test("GET all descriptions", () => {
    return Descriptions.insertMany(descriptionsData)
      .then(() => supertest(app).get("/descriptions").expect(200))
      .then((response) => {
        const body = response.body;
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toEqual(descriptionsData.length);
        body.forEach((description, index) => {
          expect(description.value).toBe(descriptionsData[index].value);
          expect(description.name).toBe(descriptionsData[index].name);
          expect(description.description1).toBe(descriptionsData[index].description1);
          expect(description.description2).toBe(descriptionsData[index].description2);
          expect(description.description3).toBe(descriptionsData[index].description3);
          expect(description.header1).toBe(descriptionsData[index].header1);
          expect(description.header2).toBe(descriptionsData[index].header2);
          expect(description.header3).toBe(descriptionsData[index].header3);
          expect(description.img1).toBe(descriptionsData[index].img1);
          expect(description.img2).toBe(descriptionsData[index].img2);
          expect(description.img3).toBe(descriptionsData[index].img3);
        });
      });
  });


});

