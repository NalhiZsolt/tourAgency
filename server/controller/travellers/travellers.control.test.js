const { mockRequest, mockResponse } = require("jest-mock-req-res");
const travellersController = require("./travellers.controller");
const travellersService = require("./travellers.service");
const createError = require("http-errors");
const Traveller = require("../../models/travellers")
jest.mock("./travellers.service.js");

describe("TravellersController test", () => {
  const mockData = [
    {
        id: 1,
        first_name: 'Béla',
        last_name: 'Kovács',
        age: 20,
        email: 'kovacs@gmail.com',
        gender: 'ferfi',
        password: '$2b$10$pysUz5OS79ViHt7ra0yRVuejEY4zg1iSVc9rawBz.FMWDnlb9p7Q.',
        city: 'Pécs',
        street: 'Kossuth u.',
        houseNumber: 10,
        zip: 1234,
        image: 'http://avatar.jpg',
        my_tours: [],
        role: 1
    },
    {
        id: 2,
        first_name: 'Imre',
        last_name: 'Vass',
        age: 21,
        email: 'vass@gmail.com',
        gender: 'ferfi',
        password: '$2b$10$shjy2hK6dTbi09b/6z72rO3XAG5eZq1MqfqPyDK.1d/GRHplG37mS',
        city: 'Baja',
        street: 'Petőfi u.',
        houseNumber: 15,
        zip: 2345,
        image: 'http://avatar2.jpg',
        my_tours: [],
        role: 1
    },
    {
        id: 3,
        first_name: 'Ilona',
        last_name: 'Virág',
        age: 22,
        email: 'virag@gmail.com',
        gender: 'nő',
        password: '$2b$10$9GP36tzRI7BLfxyn/7dTnOuHDxutgrlPpM811PhUAlYZ34g4q4WNi',
        city: 'Ózd',
        street: 'Arany u.',
        houseNumber: 30,
        zip: 3456,
        image: 'http://avatar3.jpg',
        my_tours: [],
        role: 1
    },
  ];

  let nextFunction;
  let response;
  beforeEach(() => {
    travellersService.__setMockData(mockData);
    nextFunction = jest.fn();
    response = mockResponse();
  });

  test("getTravellerById - valid ID", () => {
    const TARGET_TRAVELLER_ID = 1;
    const TARGET_TRAVELLER = mockData.find(traveller => traveller.id == TARGET_TRAVELLER_ID);
    const request = mockRequest({
      params: {
        id: TARGET_TRAVELLER_ID,
      },
    });
    return travellersController
      .getTravellerById(request, response, nextFunction)
      .then(() => {
        expect(travellersService.findOneTraveller).toBeCalledWith(TARGET_TRAVELLER_ID);
        expect(response.json).toBeCalledWith(TARGET_TRAVELLER);
      });
  });

  test("getTravellerById - invalid ID", () => {
    const TARGET_TRAVELLER_ID = 9;
    const request = mockRequest({
      params: {
        id: TARGET_TRAVELLER_ID,
      },
    });
    return travellersController
      .getTravellerById(request, response, nextFunction)
      .then(() => {
        expect(travellersService.findOneTraveller).toBeCalledWith(TARGET_TRAVELLER_ID);
        expect(nextFunction).toBeCalledWith(
          new createError.NotFound(`Couldn't find traveller with ${TARGET_TRAVELLER_ID} ID`)
        );
        expect(response.json).not.toBeCalled();
      });
  });

  test("getAllTour", () => {
    const request = mockRequest();
    return travellersController
      .getAllTraveller(request, response, nextFunction)
      .then(() => {
        expect(response.json).toBeCalledWith(mockData);
      });
  });

  test("createNewTraveller - valid traveller object", () => {
      const PASSWORD = 'password'
    const request = mockRequest({
      body: {
        first_name: 'Jolán',
        last_name: 'Török',
        age: 35,
        email: 'torok@gmail.com',
        gender: 'nő',
        password: PASSWORD,
        city: 'Győr',
        street: 'Deák u.',
        houseNumber: 80,
        zip: 4567,
        image: 'http://avatar4.jpg',
        my_tours: [],
        role: 1
        
      },
    });

    return travellersController
      .createNewTraveller(request, response, nextFunction)
      .then(() => {
        expect(travellersService.createTraveller).toBeCalled();
        expect(response.status).toBeCalledWith(201);
       
      });
  });

  test("deleteTraveller - valid ID", () => {
    const TARGET_TRAVELLER_ID = 1;
    const TARGET_TRAVELLER = mockData.find(traveller => traveller.id == TARGET_TRAVELLER_ID);;
    const request = mockRequest({
      params: {
        id: TARGET_TRAVELLER_ID,
      },
    });

    return travellersController
      .deleteTraveller(request, response, nextFunction)
      .then(() => {
        expect(travellersService.deleteTraveller).toBeCalledWith(TARGET_TRAVELLER_ID);
        expect(response.json).toBeCalledWith(TARGET_TRAVELLER);
      });
  });

  test("updateTraveller - valid ID and data", () => {
    const TARGET_TRAVELLER_ID = 1;
    const TARGET_NEW_DATA = "Szundi";
    const request = mockRequest({
      params: {
        id: TARGET_TRAVELLER_ID,
      },
      body: {
        
        first_name: 'Béla',
        last_name: TARGET_NEW_DATA,
        age: 20,
        email: 'kovacs@gmail.com',
        gender: 'ferfi',
        password: 'password',
        city: 'Pécs',
        street: 'Kossuth u.',
        houseNumber: 10,
        zip: 1234,
        image: 'http://avatar.jpg',
        my_tours: [],
        role: 1
        
      },
    });
    const updatedTraveller = {
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        age: request.body.age,
        email: request.body.email,
        gender: request.body.gender,
        password: request.body.password,
        city: request.body.city,
        street: request.body.street,
        houseNumber: request.body.houseNumber,
        zip: request.body.zip,
        image: request.body.image,
        my_tours: request.body.my_tours,
        role: request.body.role
    };

    return travellersController
      .updateTraveller(request, response, nextFunction)
      .then(() => {
        expect(travellersService.updateTraveller).toBeCalled();
        expect(travellersService.updateTraveller).toBeCalledWith(
          TARGET_TRAVELLER_ID,
          updatedTraveller
        );
        expect(response.json).toBeCalled();
        expect(response.status).toBeCalledWith(200);
      });
  });

  test("New Password - valid ID and data", () => {
    const TARGET_TRAVELLER_ID = 1;
    const TARGET_NEW_DATA = "newpassword";
    const request = mockRequest({
      params: {
        id: TARGET_TRAVELLER_ID,
      },
      body: {
        
        first_name: 'Béla',
        last_name: 'Szundi',
        age: 20,
        email: 'kovacs@gmail.com',
        gender: 'ferfi',
        password: Traveller.hashPassword(TARGET_NEW_DATA),
        city: 'Pécs',
        street: 'Kossuth u.',
        houseNumber: 10,
        zip: 1234,
        image: 'http://avatar.jpg',
        my_tours: [],
        role: 1
        
      },
    });
    const updatedTraveller = {
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        age: request.body.age,
        email: request.body.email,
        gender: request.body.gender,
        password: request.body.password,
        city: request.body.city,
        street: request.body.street,
        houseNumber: request.body.houseNumber,
        zip: request.body.zip,
        image: request.body.image,
        my_tours: request.body.my_tours,
        role: request.body.role
    };

    return travellersController
      .updateTraveller(request, response, nextFunction)
      .then(() => {
        expect(travellersService.updateTraveller).toBeCalled();
        expect(travellersService.updateTraveller).toBeCalledWith(
          TARGET_TRAVELLER_ID,
          updatedTraveller
        );
        expect(response.json).toBeCalled();
        expect(response.status).toBeCalledWith(200);
      });
  });
});
