export class Tour {
  _id?: string;
  tour_title: string;
  tour_location: string;
  tour_description: string;
  tour_description2?: string;
  tour_description3?: string;
  tour_start: any;
  tour_end: any;
  tour_type: string;
  image: string;
  travellers: Array<string>
  guide: string;
}
