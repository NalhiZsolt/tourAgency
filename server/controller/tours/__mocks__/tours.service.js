const toursService = jest.mock('./tours.service.js');

let mockData;
toursService.findOneTour = jest.fn(id => Promise.resolve(mockData.find(tour => tour.id == id)));
toursService.findAllTour = jest.fn(() => Promise.resolve(mockData));
toursService.createTour = jest.fn(newTour => Promise.resolve(
    newTour.id = mockData[mockData.length - 1].id + 1,
        mockData.push(newTour)
            )
    );
toursService.updateTour = jest.fn( (id) => {
    const index = mockData.findIndex(tour => tour.id === id)
    if (index === -1) { return Promise.resolve(undefined) }
    const foundTour = mockData.find(tour => tour.id === id);
    foundTour = {
        tour_title: updatedTourData.tour_title,
        tour_description: updatedTourData.tour_description,
        tour_description2: updatedTourData.tour_description2,
        tour_description3: updatedTourData.tour_description3,
        tour_type: updatedTourData.tour_type,
        tour_location: updatedTourData.tour_location,
        tour_start: updatedTourData.tour_start,
        tour_end: updatedTourData.tour_end,
        travellers: updatedTourData.travellers,
        guide: updatedTourData.guide,
        image: updatedTourData.image
    }
    return Promise.resolve(foundTour);
})
 
toursService.deleteTour = jest.fn(id => Promise.resolve(
        mockData.splice(tour => tour.id == id, 1)
    ));

    toursService.__setMockData = data => mockData = data;




module.exports = toursService;
