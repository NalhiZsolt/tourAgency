const { mockRequest, mockResponse } = require("jest-mock-req-res");
const descriptionsController = require("./descriptions.controller");
const descriptionsService = require("./descriptions.service");
const createError = require("http-errors");
jest.mock("./descriptions.service.js");

describe("DescriptionsController test", () => {
    const mockData = [
        {
          id: 1,
          value: 'bekesi_jaras',
          name: "Békési járás",
          description1: 'Békési járás leírás 1',
          description2: 'Békési járás leírás 2',
          description3: 'Békési járás leírás 3',
          header1: 'Békési header 1',
          header2: 'Békési header 1',
          header3: 'Békési header 1',
          img1: 'http://bekes1.jpg',
          img2: 'http://bekes2.jpg',
          img3: 'http://bekes3.jpg'
        },
        {
          id: 2,
          value: 'borsodi_jaras',
          name: "Borsodi járás",
          description1: 'Borsodi járás leírás 1',
          description2: 'Borsodi járás leírás 2',
          description3: 'Borsodi járás leírás 3',
          header1: 'Borsodi header 1',
          header2: 'Borsodi header 1',
          header3: 'Borsodi header 1',
          img1: 'http://borsod1.jpg',
          img2: 'http://borsod2.jpg',
          img3: 'http://borsod3.jpg'
        },
        {
          id: 3,
          value: 'zempleni_jaras',
          name: "Zempléni járás",
          description1: 'Zempléni járás leírás 1',
          description2: 'Zempléni járás leírás 2',
          description3: 'Zempléni járás leírás 3',
          header1: 'Zempléni header 1',
          header2: 'Zempléni header 1',
          header3: 'Zempléni header 1',
          img1: 'http://zempleni1.jpg',
          img2: 'http://zempleni2.jpg',
          img3: 'http://zempleni3.jpg'
        },
      ];

  let nextFunction;
  let response;
  beforeEach(() => {
    descriptionsService.__setMockData(mockData);
    nextFunction = jest.fn();
    response = mockResponse();
  });

  test("getAllDescription", () => {
    const request = mockRequest();
    return descriptionsController
      .getAllDescriptions(request, response, nextFunction)
      .then(() => {
        expect(response.json).toBeCalledWith(mockData);
      });
  });
});
