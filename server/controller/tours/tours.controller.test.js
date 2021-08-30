const { mockRequest, mockResponse } = require("jest-mock-req-res");
const toursController = require("./tours.controller");
const toursService = require("./tours.service");
const createError = require("http-errors");
jest.mock("./tours.service.js");

describe("ToursController test", () => {
  const mockData = [
    {
      id: 1,
      tour_title: 'Első túra neve',
      tour_description: 'Első túra leírás 1',
      tour_description2: 'Első túra leírás 2',
      tour_description3: 'Első túra leírás 3',
      tour_type: 'Öko túra',
      tour_location: 'Szeged',
      tour_start: 'start',
      tour_end: 'end',
      travellers: [],
      guide: 'objectId',
      image: 'http://elso_tura_imag.jpg'
    },
    {
      id: 2,
      tour_title: 'Második túra neve',
      tour_description: 'Második túra leírás 1',
      tour_description2: 'Második túra leírás 2',
      tour_description3: 'Második túra leírás 3',
      tour_type: 'Öko túra',
      tour_location: 'Szentes',
      tour_start: 'start',
      tour_end: 'end',
      travellers: [],
      guide: 'objectId',
      image: 'http://masodik_tura_imag.jpg'
    },
    {
      id: 3,
      tour_title: 'Harmadik túra neve',
      tour_description: 'Harmadik túra leírás 1',
      tour_description2: 'Harmadik túra leírás 2',
      tour_description3: 'Harmadik túra leírás 3',
      tour_type: 'Öko túra',
      tour_location: 'Makó',
      tour_start: 'start',
      tour_end: 'end',
      travellers: [],
      guide: 'objectId',
      image: 'http://harmadik_tura_imag.jpg'
    },
  ];

  let nextFunction;
  let response;
  beforeEach(() => {
    toursService.__setMockData(mockData);
    nextFunction = jest.fn();
    response = mockResponse();
  });

  test("getTourById - valid ID", () => {
    const TARGET_TOUR_ID = 1;
    const TARGET_TOUR = mockData.find(tour => tour.id == TARGET_TOUR_ID);
    const request = mockRequest({
      params: {
        id: TARGET_TOUR_ID,
      },
    });
    return toursController
      .getTourById(request, response, nextFunction)
      .then(() => {
        expect(toursService.findOneTour).toBeCalledWith(TARGET_TOUR_ID);
        expect(response.json).toBeCalledWith(TARGET_TOUR);
      });
  });

  test("getTourById - invalid ID", () => {
    const TARGET_TOUR_ID = 9;
    const request = mockRequest({
      params: {
        id: TARGET_TOUR_ID,
      },
    });
    return toursController
      .getTourById(request, response, nextFunction)
      .then(() => {
        expect(toursService.findOneTour).toBeCalledWith(TARGET_TOUR_ID);
        expect(nextFunction).toBeCalledWith(
          new createError.NotFound(`Tour not found with this ID: ${TARGET_TOUR_ID}`)
        );
        expect(response.json).not.toBeCalled();
      });
  });

  test("getAllTour", () => {
    const request = mockRequest();
    return toursController
      .getAllTours(request, response, nextFunction)
      .then(() => {
        expect(response.json).toBeCalledWith(mockData);
      });
  });

  test("createNewTour - valid tour object", () => {
    const request = mockRequest({
      body: {
        tour_title: 'Új túra neve',
        tour_description: 'Új túra leírás 1',
        tour_description2: 'Új túra leírás 2',
        tour_description3: 'Új túra leírás 3',
        tour_type: 'Valamilyen túra',
        tour_location: 'Bárhol',
        tour_start: 'start',
        tour_end: 'end',
        travellers: [],
        guide: 'objectId',
        image: 'http://uj_tura_imag.jpg'
      },
    });

    return toursController
      .createNewTour(request, response, nextFunction)
      .then(() => {
        expect(toursService.createTour).toBeCalled();
        expect(toursService.createTour).toBeCalledWith({
          id: 4,
          tour_title: 'Új túra neve',
        tour_description: 'Új túra leírás 1',
        tour_description2: 'Új túra leírás 2',
        tour_description3: 'Új túra leírás 3',
        tour_type: 'Valamilyen túra',
        tour_location: 'Bárhol',
        tour_start: 'start',
        tour_end: 'end',
        travellers: [],
        guide: 'objectId',
        image: 'http://uj_tura_imag.jpg'
        });
      });
  });

  test("deleteTour - valid ID", () => {
    const TARGET_TOUR_ID = 1;
    const request = mockRequest({
      params: {
        id: TARGET_TOUR_ID,
      },
    });

    return toursController
      .deleteTour(request, response, nextFunction)
      .then(() => {
        expect(toursService.deleteTour).toBeCalledWith(TARGET_TOUR_ID);
        expect(response.json).toBeCalledWith({
          tourDeleted: true,
        });
      });
  });

  test("updateTour - valid ID and data", () => {
    const TARGET_TOUR_ID = 1;
    const TARGET_NEW_DATA = "Új tour név";
    const request = mockRequest({
      params: {
        id: TARGET_TOUR_ID,
      },
      body: {
        tour_title: TARGET_NEW_DATA ,
        tour_description: 'Első túra leírás 1',
        tour_description2: 'Első túra leírás 2',
        tour_description3: 'Első túra leírás 3',
        tour_type: 'Öko túra',
        tour_location: 'Szeged',
        tour_start: 'start',
        tour_end: 'end',
        travellers: [],
        guide: 'objectId',
        image: 'http://elso_tura_imag.jpg'
      },
    });
    const updatedTour = {
        tour_title: request.body.tour_title,
        tour_description: request.body.tour_description,
        tour_description2: request.body.tour_description2,
        tour_description3: request.body.tour_description3,
        tour_type: request.body.tour_type,
        tour_location: request.body.tour_location,
        tour_start: request.body.tour_start,
        tour_end: request.body.tour_end,
        travellers: request.body.travellers,
        guide: request.body.guide,
        image: request.body.image
    };

    return toursController
      .updateTour(request, response, nextFunction)
      .then(() => {
        //expect(toursService.updateTour).toBeCalled();
        expect(toursService.updateTour).toBeCalledWith(
          TARGET_TOUR_ID,
          updatedTour
        );
        expect(response.json).toBeCalled();
      });
  });
});
