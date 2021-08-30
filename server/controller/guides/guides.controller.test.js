const { mockRequest, mockResponse } = require("jest-mock-req-res");
const guidesController = require("./guides.controller");
const guidesService = require("./guides.service");
const createError = require("http-errors");
jest.mock("./guides.service.js");

describe("GuidesController test", () => {
  const mockData = [
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      age: 20,
      image: "http://valamilyen.image.jpg",
      description1: "description1",
      description2: "description2",
      tours: [],
    },
    {
      id: 2,
      first_name: "Jane",
      last_name: "Doe",
      age: 25,
      image: "http://valamilyen.image2.jpg",
      description1: "description Jane",
      description2: "description Jane",
      tours: [],
    },
    {
      id: 3,
      first_name: "John",
      last_name: "Williams",
      age: 23,
      image: "http://valamilyen.image3.jpg",
      description1: "description John Williams",
      description2: "description John Williams",
      tours: [],
    },
  ];

  let nextFunction;
  let response;
  beforeEach(() => {
    guidesService.__setMockData(mockData);
    nextFunction = jest.fn();
    response = mockResponse();
  });

  test("getGuideById - valid ID", () => {
    const TARGET_GUIDE_ID = 1;
    const TARGET_GUIDE = mockData.find((p) => p.id == TARGET_GUIDE_ID);
    const request = mockRequest({
      params: {
        id: TARGET_GUIDE_ID,
      },
    });
    return guidesController
      .getGuideById(request, response, nextFunction)
      .then(() => {
        expect(guidesService.findOneGuide).toBeCalledWith(TARGET_GUIDE_ID);
        expect(response.json).toBeCalledWith(TARGET_GUIDE);
      });
  });

  test("getGuideById - invalid ID", () => {
    const TARGET_GUIDE_ID = 9;
    const request = mockRequest({
      params: {
        id: TARGET_GUIDE_ID,
      },
    });
    return guidesController
      .getGuideById(request, response, nextFunction)
      .then(() => {
        expect(guidesService.findOneGuide).toBeCalledWith(TARGET_GUIDE_ID);
        expect(nextFunction).toBeCalledWith(
          new createError.NotFound(`Guide not found with this ID: ${TARGET_GUIDE_ID}`)
        );
        expect(response.json).not.toBeCalled();
      });
  });

  test("getAllGuide", () => {
    const request = mockRequest();
    return guidesController
      .getAllGuides(request, response, nextFunction)
      .then(() => {
        expect(response.json).toBeCalledWith(mockData);
      });
  });

  test("createNewGuide - valid guide object", () => {
    const request = mockRequest({
      body: {
        first_name: "Jimmy",
        last_name: "Hendrics",
        age: 33,
        image: "http://valamilyen.image-hendrics.jpg",
        description1: "description Jimmy",
        description2: "description Hendrics",
        tours: [],
      },
    });

    return guidesController
      .createNewGuide(request, response, nextFunction)
      .then(() => {
        expect(guidesService.createGuide).toBeCalled();
        expect(guidesService.createGuide).toBeCalledWith({
          id: 4,
          first_name: "Jimmy",
          last_name: "Hendrics",
          age: 33,
          image: "http://valamilyen.image-hendrics.jpg",
          description1: "description Jimmy",
          description2: "description Hendrics",
          tours: [],
        });
      });
  });

  test("deleteGuide - vailid ID", () => {
    const TARGET_GUIDE_ID = 1;
    const request = mockRequest({
      params: {
        id: TARGET_GUIDE_ID,
      },
    });

    return guidesController
      .deleteGuide(request, response, nextFunction)
      .then(() => {
        expect(guidesService.deleteGuide).toBeCalledWith(TARGET_GUIDE_ID);
        expect(response.json).toBeCalledWith({
          guideDeleted: true,
        });
      });
  });

  test("updateGuide - valid ID and data", () => {
    const TARGET_GUIDE_ID = 1;
    const TARGET_NEW_DATA = "Bambi";
    const request = mockRequest({
      params: {
        id: TARGET_GUIDE_ID,
      },
      body: {
        first_name: "John",
        last_name: TARGET_NEW_DATA,
        age: 20,
        image: "http://valamilyen.image.jpg",
        description1: "description1",
        description2: "description2",
        tours: [],
      },
    });
    const updatedGuide = {
      first_name: request.body.first_name,
      last_name: request.body.last_name,
      age: request.body.age,
      image: request.body.image,
      description1: request.body.description1,
      description2: request.body.description2,
      tours: request.body.tours,
    };

    return guidesController
      .updateGuide(request, response, nextFunction)
      .then(() => {
        expect(guidesService.updateGuide).toBeCalled();
        expect(guidesService.updateGuide).toBeCalledWith(
          TARGET_GUIDE_ID,
          updatedGuide
        );
        expect(response.json).toBeCalled();
      });
  });
});
