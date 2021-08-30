const descriptionsService = jest.mock('./descriptions.service.js');

let mockData;
descriptionsService.findAllDescription = jest.fn(() => Promise.resolve(mockData));

descriptionsService.__setMockData = data => mockData = data;

module.exports = descriptionsService;
