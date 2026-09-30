import {
  TripFormInputs,
  TravelPlanResult,
  PlaceToVisit,
  DayItinerary,
  PackingItem,
  LocalFoodGuide,
} from '../types/travel';

// Knowledge base for major domestic and international travel spots
interface DestinationData {
  heroTagline: string;
  recommendedArea: string;
  hotelName: string;
  hotelCategory: string;
  hotelNightlyRate: number;
  flightBasePerPerson: number;
  places: PlaceToVisit[];
  itineraryDays: Array<{
    title: string;
    theme: string;
    morning: { activity: string; description: string; insiderTip: string };
    afternoon: { activity: string; description: string; insiderTip: string };
    evening: { activity: string; description: string; insiderTip: string };
  }>;
  foodGuide: LocalFoodGuide;
  packingAdditions: string[];
}

const DESTINATIONS_DB: Record<string, DestinationData> = {
  goa: {
    heroTagline: "Sun-drenched golden beaches, Portuguese heritage, and vibrant coastal cuisine",
    recommendedArea: "North Goa (Candolim/Anjuna) for vibrance or South Goa (Palolem) for tranquility",
    hotelName: "Heritage Azure Boutique Resort & Villas",
    hotelCategory: "Boutique Coastal Resort (4-Star)",
    hotelNightlyRate: 4800,
    flightBasePerPerson: 5500,
    places: [
      {
        id: "p1",
        name: "Palolem & Butterfly Beach",
        shortDescription: "Crescent-shaped bay with calm azure waters, kayak trails, and dolphin spotting.",
        suggestedDuration: "3-4 hours",
        bestTimeToVisit: "Early morning or golden sunset",
        category: "Beach & Nature",
        highlightTag: "Scenic & Relaxed",
      },
      {
        id: "p2",
        name: "Fontainhas Latin Quarter",
        shortDescription: "Centuries-old Portuguese villas painted in pastel ochre, quaint bakeries, and art galleries.",
        suggestedDuration: "2-3 hours",
        bestTimeToVisit: "10:00 AM – 1:00 PM",
        category: "Heritage & Walk",
        highlightTag: "Photographer's Dream",
      },
      {
        id: "p3",
        name: "Chapora Fort & Vagator Cliffs",
        shortDescription: "Historic red laterite fortress offering panoramic vistas over the Arabian Sea.",
        suggestedDuration: "1.5 hours",
        bestTimeToVisit: "5:00 PM sunset",
        category: "Sightseeing",
        highlightTag: "Iconic Sunset",
      },
      {
        id: "p4",
        name: "Dudhsagar Waterfalls & Spice Plantation",
        shortDescription: "Four-tiered majestic cascade in Bhagwan Mahaveer Sanctuary followed by authentic Goan lunch.",
        suggestedDuration: "Full day excursion",
        bestTimeToVisit: "8:00 AM departure",
        category: "Adventure & Nature",
        highlightTag: "Wild Safari",
      },
      {
        id: "p5",
        name: "Anjuna Flea & Night Market",
        shortDescription: "Bohemian market with live acoustic musicians, artisan handicrafts, and seaside cocktail shacks.",
        suggestedDuration: "3 hours",
        bestTimeToVisit: "7:00 PM onward",
        category: "Shopping & Nightlife",
        highlightTag: "Vibrant Culture",
      },
    ],
    itineraryDays: [
      {
        title: "Coastal Arrival & Sunset Shack Vibes",
        theme: "Arrival, Unwinding & Ocean Breeze",
        morning: {
          activity: "Arrival & Coastal Check-in",
          description: "Arrive at Dabolim / Mopa airport, transfer to resort, and refresh with chilled kokum sherbet.",
          insiderTip: "Pre-book airport prepaid cab to avoid peak surge pricing.",
        },
        afternoon: {
          activity: "Relaxation at Candolim or Palolem Shore",
          description: "Stroll along the soft sand, swim in warm gentle waves, and sample fresh coconut water.",
          insiderTip: "Rent an eco-scooter for easy village hopping.",
        },
        evening: {
          activity: "Seaside Sunset & Fresh Catch Dinner",
          description: "Watch the crimson sunset over the Arabian Sea accompanied by grilled kingfish and Goan curry.",
          insiderTip: "Reserve a front-row ocean shack table by 5:30 PM.",
        },
      },
      {
        title: "Latin Quarter Heritage & Cliff Views",
        theme: "Colonial History, Art & Culinary Discovery",
        morning: {
          activity: "Walking Tour of Fontainhas, Panaji",
          description: "Explore narrow cobblestone streets, tile-roofed mansions, and 18th-century churches.",
          insiderTip: "Stop at Confeitaria 31 de Janeiro for traditional Bebinca and warm poee.",
        },
        afternoon: {
          activity: "Mandovi River Cruise or Spice Plantation",
          description: "Learn about cardamom, cinnamon and nutmeg farming, followed by an aromatic buffet.",
          insiderTip: "Carry light sunscreen and a wide-brim hat.",
        },
        evening: {
          activity: "Chapora Fort Silhouette & Acoustic Live Music",
          description: "Hike up the cliff trail for breath-taking dusk vistas, then dine at a garden bistro.",
          insiderTip: "Wear grippy sneakers for the rocky fort slope.",
        },
      },
      {
        title: "Island Hopping, Watersports & Farewell",
        theme: "Adrenaline, Hidden Coves & Keepsakes",
        morning: {
          activity: "Kayaking & Dolphin Safari",
          description: "Paddle across the calm backwaters of Nerul river or take a motorized boat to secret coves.",
          insiderTip: "Early mornings before 8:30 AM offer the calmest water visibility.",
        },
        afternoon: {
          activity: "Artisan Souvenir Shopping & Shacks",
          description: "Pick up roasted cashews, feni, organic spices, and handmade ceramics.",
          insiderTip: "Visit Mapusa market or local Panaji emporiums for fair prices.",
        },
        evening: {
          activity: "Farewell Candlelight Dinner on the Beach",
          description: "Enjoy live Goan folk music, seafood platter, and toast to an unforgettable trip.",
          insiderTip: "Leave for airport 2.5 hours prior during evening traffic.",
        },
      },
    ],
    foodGuide: {
      localDishes: [
        { name: "Goan Fish Curry & Steamed Rice", description: "Tangy coconut milk and raw mango gravy infused with fresh surmai or pomfret.", spot: "Fisherman's Wharf / Ritz Classic" },
        { name: "Pork or Chicken Vindaloo", description: "Authentic Portuguese-Goan slow-cooked spicy wine-vinegar stew.", spot: "Mum's Kitchen, Panaji" },
        { name: "Traditional Bebinca", description: "Indulgent 7-layer baked coconut milk and jaggery dessert.", spot: "Confeitaria 31 de Janeiro" },
      ],
      vegetarianOptions: [
        { name: "Mushroom Xacuti", description: "White button mushrooms simmered in a roasted coconut, poppy seed, and peri-peri paste." },
        { name: "Alsande Tonak & Warm Poee", description: "Red cowpeas in rich toasted coriander gravy served with wood-fired bread." },
        { name: "Khatkhate Stew", description: "Sacred festive stew made with five seasonal vegetables, teppal berries, and jaggery." },
      ],
      budgetFoodSuggestions: [
        { name: "Local Beachside Poee & Omelette Ros", description: "Goan bread drenched in spicy xacuti gravy.", priceRange: "₹80 - ₹150 per person" },
        { name: "Village Thali Shacks", description: "Unlimited daily vegetable or fish thali with sol kadhi.", priceRange: "₹180 - ₹250" },
      ],
      premiumFoodSuggestions: [
        { name: "Antares & Thalassa Waterfront Dining", description: "Modern Mediterranean and Greek fusion on clifftop deck with craft cocktails.", priceRange: "₹2,200 - ₹3,500 per person" },
        { name: "Cavatina by Avinash Martins", description: "Artisanal contemporary Goan fine dining celebrating ancestral culinary craft.", priceRange: "₹2,800 - ₹4,000 per person" },
      ],
    },
    packingAdditions: [
      "Light linen shirts and breezy beachwear",
      "UV protection sunglasses & reef-safe sunscreen (SPF 50+)",
      "Waterproof dry pouch for phone & cash during boat trips",
      "Slip-resistant flip flops & light walking trainers",
      "Mosquito repellent for evening seaside shacks",
    ],
  },
  manali: {
    heroTagline: "Towering snow peaks, cedar pine forests, and thrilling mountain passes",
    recommendedArea: "Old Manali for cedar forests & café culture or Solang Valley for adventure",
    hotelName: "Highland Pine Mountain Chalet & Spa",
    hotelCategory: "Alpine Luxury Resort (4-Star)",
    hotelNightlyRate: 4200,
    flightBasePerPerson: 6800,
    places: [
      {
        id: "p1",
        name: "Solang Valley & Rohtang Pass",
        shortDescription: "High-altitude glacial pass with sweeping panorama of Pir Panjal mountain ranges.",
        suggestedDuration: "5-6 hours",
        bestTimeToVisit: "Early morning to avoid traffic",
        category: "Snow & Adventure",
        highlightTag: "Must-Visit Alpine",
      },
      {
        id: "p2",
        name: "Old Manali Village & Hadimba Temple",
        shortDescription: "Ancient pagoda-style wooden temple nestled inside giant deodar cedar woodlands.",
        suggestedDuration: "2 hours",
        bestTimeToVisit: "10:00 AM",
        category: "Heritage & Culture",
        highlightTag: "Peaceful Forest",
      },
      {
        id: "p3",
        name: "Jogini Waterfall Trek",
        shortDescription: "Gentle 3km scenic hike through apple orchards and bubbling streams to twin roaring cascades.",
        suggestedDuration: "3 hours",
        bestTimeToVisit: "Morning or mid-day",
        category: "Trekking",
        highlightTag: "Panoramic Valley Views",
      },
      {
        id: "p4",
        name: "Vashisht Hot Sulfur Springs",
        shortDescription: "Natural therapeutic mineral springs with stone bathhouses and rooftop cafés.",
        suggestedDuration: "1.5 hours",
        bestTimeToVisit: "4:00 PM",
        category: "Wellness",
        highlightTag: "Warm Relaxation",
      },
      {
        id: "p5",
        name: "Mall Road & Tibetan Monastery",
        shortDescription: "Lively pedestrian promenade with woolens, wooden crafts, and hand-spun shawls.",
        suggestedDuration: "2 hours",
        bestTimeToVisit: "Evening 6:00 PM",
        category: "Shopping & Culture",
        highlightTag: "Evening Buzz",
      },
    ],
    itineraryDays: [
      {
        title: "Mountain Arrival & Old Manali Cafes",
        theme: "Acclimatization & Cedar Air",
        morning: {
          activity: "Valley Arrival & Chalet Check-in",
          description: "Arrive via Bhuntar/Chandigarh, check in to pine chalet with mountain valley balconies.",
          insiderTip: "Sip hot Himalayan kahwa tea to settle into the altitude.",
        },
        afternoon: {
          activity: "Hadimba Devi Temple & Forest Walk",
          description: "Walk under 400-year-old towering deodar trees and visit the historic carved wooden shrine.",
          insiderTip: "Take photos with the gentle mountain yaks and fluffy angora rabbits outside.",
        },
        evening: {
          activity: "Old Manali Acoustic Cafe Evening",
          description: "Dine on wood-fired pizza and trout beside a mountain brook with live indie music.",
          insiderTip: "Try Cafe 1947 or Dylan's Toasted & Roasted for great desserts.",
        },
      },
      {
        title: "Solang Valley Snow Thrills & Paragliding",
        theme: "High Altitude Adventure & Adrenaline",
        morning: {
          activity: "Solang Valley Adventure Activities",
          description: "Experience paragliding, ATV rides, and cable car ropeway up to 10,000 feet.",
          insiderTip: "Check weather forecast early morning before booking high paragliding flights.",
        },
        afternoon: {
          activity: "Atal Tunnel & Sissu Valley Drive",
          description: "Pass through the marvel 9km Atal Tunnel into the dramatically barren Lahaul Valley.",
          insiderTip: "Carry an extra windproof jacket; Sissu is noticeably cooler and windier.",
        },
        evening: {
          activity: "Bonfire & Stargazing at Resort",
          description: "Unwind around an outdoor woodfire pit beneath crystal clear Himalayan starlight.",
          insiderTip: "Keep thermals handy as evening temperatures dip rapidly.",
        },
      },
      {
        title: "Jogini Falls Hike & Local Bazaars",
        theme: "Nature Trails & Keepsakes",
        morning: {
          activity: "Jogini Waterfall Forest Hike",
          description: "Follow the riverside trail winding through terraced apple gardens to the refreshing spray.",
          insiderTip: "Carry water and small snacks; footwear with good tread is essential.",
        },
        afternoon: {
          activity: "Vashisht Village & Herbal Tea Lounges",
          description: "Relax your muscles in the hot spring water and explore bohemian mountain apparel shops.",
          insiderTip: "Taste fresh local apple juice sold along the stone pathways.",
        },
        evening: {
          activity: "Mall Road Stroll & Traditional Dham Dinner",
          description: "Shop for authentic Kullu shawls and organic honey before a traditional feast.",
          insiderTip: "Ask for government-certified handloom emporiums for real pashmina.",
        },
      },
    ],
    foodGuide: {
      localDishes: [
        { name: "Himachali Siddu with Ghee", description: "Steamed fermented wheat bun stuffed with crushed walnuts, poppy seeds, and herbs.", spot: "The Himalayan Trout Fish / Chopsticks" },
        { name: "Fresh Tawa Himalayan Trout", description: "Locally farmed river trout pan-seared with butter, lemon, and garlic herbs.", spot: "Johnson's Cafe & Bar" },
        { name: "Kullu Dham Feast", description: "Seven-course celebratory feast cooked in brass vessels with madra, khatta, and sweet rice." },
      ],
      vegetarianOptions: [
        { name: "Chana Madra", description: "Kabuli chickpeas simmered in spiced yogurt gravy and whole cardamoms." },
        { name: "Pahadi Babru", description: "Crispy kachori-like flatbread stuffed with spiced black gram dal." },
        { name: "Tibetan Veg Thukpa & Steamed Tingmo", description: "Hearty vegetable noodle soup served with fluffy steamed bread flower." },
      ],
      budgetFoodSuggestions: [
        { name: "Street Momos & Hot Vegetable Thukpa", description: "Steaming hot momo stalls near Tibetan Market.", priceRange: "₹80 - ₹140" },
        { name: "Old Manali Bakery Treats", description: "Fresh cinnamon rolls, apple pies, and ginger lemon honey tea.", priceRange: "₹120 - ₹220" },
      ],
      premiumFoodSuggestions: [
        { name: "Johnson's Cafe & Garden Bar", description: "Celebrated stone cottage restaurant famous for baked trout and mulberry crumbles.", priceRange: "₹1,200 - ₹2,000 per person" },
        { name: "La Plage Manali (Seasonal)", description: "Artisan French and Himalayan fusion situated amidst serene apple orchards.", priceRange: "₹1,800 - ₹2,800 per person" },
      ],
    },
    packingAdditions: [
      "Layered thermal innerwear & fleece jacket",
      "Water-resistant hiking boots with ankle support",
      "UV polarizing sunglasses (essential for snow glare)",
      "High-moisture lip balm & cold cream",
      "Power bank (batteries drain 30% faster in cold climates)",
    ],
  },
  kerala: {
    heroTagline: "Tranquil emerald backwaters, misty tea plantations, and ayurvedic rejuvenation",
    recommendedArea: "Alleppey for houseboats & Munnar for tea garden hills",
    hotelName: "Spice Coast Heritage Backwater Villa",
    hotelCategory: "Eco Heritage Retreat (4-Star)",
    hotelNightlyRate: 4500,
    flightBasePerPerson: 5800,
    places: [
      {
        id: "p1",
        name: "Alleppey Backwaters & Vembanad Lake",
        shortDescription: "Glide through palm-fringed lagoons, lotus paddies, and quaint canal villages.",
        suggestedDuration: "4-5 hours",
        bestTimeToVisit: "11:00 AM – 4:00 PM",
        category: "Backwaters & Cruise",
        highlightTag: "Iconic Kerala",
      },
      {
        id: "p2",
        name: "Munnar Tea Estates & Mattupetty",
        shortDescription: "Rolling green carpet of tea gardens, misty viewpoints, and elephant reserves.",
        suggestedDuration: "Full Day",
        bestTimeToVisit: "Morning 8:30 AM",
        category: "Hills & Nature",
        highlightTag: "Breathtaking Greens",
      },
      {
        id: "p3",
        name: "Fort Kochi Heritage & Chinese Fishing Nets",
        shortDescription: "Historical colonial port, Jew Town spice warehouses, and Kathakali cultural theatre.",
        suggestedDuration: "3 hours",
        bestTimeToVisit: "Late afternoon & sunset",
        category: "Art & Heritage",
        highlightTag: "Cultural Gem",
      },
      {
        id: "p4",
        name: "Periyar Wildlife Sanctuary, Thekkady",
        shortDescription: "Boat safari over the mist-covered reservoir to spot wild elephants, otters, and hornbills.",
        suggestedDuration: "3 hours",
        bestTimeToVisit: "Dawn 6:30 AM safari",
        category: "Wildlife",
        highlightTag: "Jungle Sanctuary",
      },
      {
        id: "p5",
        name: "Marari Beach",
        shortDescription: "Untouched pristine white sandy coastline dotted with traditional fishing catamarans.",
        suggestedDuration: "2 hours",
        bestTimeToVisit: "5:00 PM sunset",
        category: "Beach & Wellness",
        highlightTag: "Tranquil Shore",
      },
    ],
    itineraryDays: [
      {
        title: "Kochi Heritage & Colonial Spice Markets",
        theme: "Colonial History, Spice Aromas & Sunset Nets",
        morning: {
          activity: "Arrival in Kochi & Fort Kochi Stroll",
          description: "Arrive at Cochin International Airport, check in and walk along Dutch and Portuguese alleys.",
          insiderTip: "Take the quick 10-minute public ferry from Ernakulam to Fort Kochi for ₹6.",
        },
        afternoon: {
          activity: "Jew Town & Mattancherry Palace",
          description: "Browse 400-year-old antique shops, cinnamon spice barrels, and Jewish synagogue.",
          insiderTip: "Buy vacuum-packed Malabar black pepper and cardamom straight from traders.",
        },
        evening: {
          activity: "Sunset by Chinese Fishing Nets & Kathakali Show",
          description: "Watch fishermen operate cantilevered net rigs, followed by a classical masked dance.",
          insiderTip: "Arrive 30 minutes early at the theatre to witness the elaborate facial makeup ritual.",
        },
      },
      {
        title: "Alleppey Houseboat Lagoon Cruise",
        theme: "Lush Backwaters & Traditional Sadhya Lunch",
        morning: {
          activity: "Transfer to Alleppey & Houseboat Boarding",
          description: "Board a traditional thatched-roof Kettuvallam and set sail into quiet village canals.",
          insiderTip: "Request fresh tender coconut water upon boarding.",
        },
        afternoon: {
          activity: "Canal Village Cruise & Karimeen Fry Lunch",
          description: "Feast on pearl spot fish, red matta rice, and coconut curd curries prepared on board.",
          insiderTip: "Watch local coir rope makers spinning coconut husk on the banks.",
        },
        evening: {
          activity: "Golden Hour Anchorage & Canoe Exploration",
          description: "Transfer to a small wooden canoe for narrow backwater alleys inaccessible by large boats.",
          insiderTip: "Keep insect repellent ready as sunset approaches near water.",
        },
      },
      {
        title: "Ayurvedic Spa & Serene Coastal Farewell",
        theme: "Rejuvenation, Wellness & Coastal Flavors",
        morning: {
          activity: "Traditional Abhyanga Ayurvedic Massage",
          description: "Experience authentic 60-minute warm herbal oil therapy by certified practitioners.",
          insiderTip: "Avoid heavy meals prior to massage and hydrate thoroughly after.",
        },
        afternoon: {
          activity: "Marari Fishing Village & Coconut Groves",
          description: "Relax under swaying palms on pristine secluded sand away from crowds.",
          insiderTip: "Taste fresh pathiri with vegetable stew at a local beach shack.",
        },
        evening: {
          activity: "Farewell Coastal Dinner & Airport Transfer",
          description: "Savor appam with vegetable or mutton stew and warm banana fritters.",
          insiderTip: "Allow 1.5 hours travel time to Kochi airport from Alleppey/Marari.",
        },
      },
    ],
    foodGuide: {
      localDishes: [
        { name: "Karimeen Pollichathu", description: "Pearl spot fish marinated in spicy shallot paste, wrapped in banana leaf and pan-grilled.", spot: "Cassava / Paragon" },
        { name: "Kerala Beef or Chicken Roast with Malabar Parotta", description: "Flaky layered flatbread served with caramelized shallot coconut curry.", spot: "Paragon Restaurant, Kochi" },
        { name: "Grand Kerala Sadhya", description: "24-item vegetarian feast served on fresh banana leaf with payasam dessert.", spot: "Grand Hotel, MG Road" },
      ],
      vegetarianOptions: [
        { name: "Appam with Vegetable Ishtu", description: "Lacy fermented rice hoppers paired with silky coconut milk vegetable stew." },
        { name: "Avial & Kalan", description: "Thick vegetable medley tossed in grated coconut, cumin, and sour yogurt." },
        { name: "Puttu and Kadala Curry", description: "Steamed cylindrical rice ground cylinders layered with coconut and black chickpea curry." },
      ],
      budgetFoodSuggestions: [
        { name: "Local Toddy Shop Tawa Snacks", description: "Spicy tapioca mash (kappa) with onion chili gravy.", priceRange: "₹90 - ₹180" },
        { name: "Tea Stall Pazham Pori (Banana Fritters)", description: "Crisp ripe Kerala plantain fritters with sweet chai.", priceRange: "₹30 - ₹60" },
      ],
      premiumFoodSuggestions: [
        { name: "The Rice Boat (Taj Malabar)", description: "High-end seafood dining in a historic converted wooden boat setting.", priceRange: "₹2,500 - ₹4,000 per person" },
        { name: "Malabar Junction (Malabar House)", description: "Gourmet Mediterranean-Kerala seafood fusion in a colonial courtyard.", priceRange: "₹2,000 - ₹3,500 per person" },
      ],
    },
    packingAdditions: [
      "Breathable pure cotton and linen clothes",
      "Sturdy umbrella / light rain poncho (tropical weather)",
      "Herbal mosquito repellent lotion",
      "Comfortable slip-on sandals for temple and boat visits",
      "Hat & sunglasses for backwater sun reflections",
    ],
  },
  jaipur: {
    heroTagline: "Royal Rajput palaces, grand desert forts, and dazzling artisan bazaars",
    recommendedArea: "C-Scheme for cafes & dining or near Amer for heritage grandeur",
    hotelName: "Haveli Royal Heritage Palace",
    hotelCategory: "Heritage Haveli (4-Star)",
    hotelNightlyRate: 4600,
    flightBasePerPerson: 5200,
    places: [
      {
        id: "p1",
        name: "Amer Fort & Maota Lake",
        shortDescription: "Magnificent hilltop citadel featuring Sheesh Mahal (hall of mirrors) and yellow sandstone ramparts.",
        suggestedDuration: "3 hours",
        bestTimeToVisit: "8:30 AM before crowds",
        category: "Forts & Palaces",
        highlightTag: "Architectural Wonder",
      },
      {
        id: "p2",
        name: "Hawa Mahal (Palace of Winds)",
        shortDescription: "Iconic five-story pink honeycomb facade with 953 intricately carved jharokhas.",
        suggestedDuration: "1 hour",
        bestTimeToVisit: "Morning 9:00 AM (best front lighting)",
        category: "Iconic Heritage",
        highlightTag: "Must-See Landmark",
      },
      {
        id: "p3",
        name: "City Palace & Jantar Mantar",
        shortDescription: "Royal museum pavilions alongside UNESCO astronomical observatory with world's largest sundial.",
        suggestedDuration: "2.5 hours",
        bestTimeToVisit: "11:00 AM",
        category: "Royal History",
        highlightTag: "UNESCO World Heritage",
      },
      {
        id: "p4",
        name: "Nahargarh Fort Sunset Viewpoint",
        shortDescription: "Perched high on the Aravalli hills overlooking the pink city bathed in golden twilight.",
        suggestedDuration: "2 hours",
        bestTimeToVisit: "5:00 PM sunset",
        category: "Panoramic Views",
        highlightTag: "Best Sunset Spot",
      },
      {
        id: "p5",
        name: "Johari & Bapu Bazaars",
        shortDescription: "Vibrant medieval markets offering blue pottery, gemstone jewelry, juttis, and block prints.",
        suggestedDuration: "2.5 hours",
        bestTimeToVisit: "Late afternoon 4:00 PM",
        category: "Shopping & Crafts",
        highlightTag: "Artisan Shopping",
      },
    ],
    itineraryDays: [
      {
        title: "Arrival, Pink City Gates & Hawa Mahal",
        theme: "First Impressions & Royal Architectural Splendor",
        morning: {
          activity: "Arrival & Heritage Haveli Check-In",
          description: "Arrive at Jaipur, welcome with marigold garlands, and refresh in your heritage room.",
          insiderTip: "Stay in a restored haveli for true Rajput hospitality.",
        },
        afternoon: {
          activity: "City Palace & Jantar Mantar Exploration",
          description: "Walk through royal courtyards, Peacock Gate, and giant astronomical stone instruments.",
          insiderTip: "Hire a certified government guide for fascinating folklore.",
        },
        evening: {
          activity: "Wind Palace View & Rooftop Chai",
          description: "Photograph Hawa Mahal from across the street at Wind View Cafe with fragrant masala tea.",
          insiderTip: "The street lights up beautifully just after sunset at 6:30 PM.",
        },
      },
      {
        title: "Amer Fort Citadel & Nahargarh Sunset",
        theme: "Epic Fortresses & Panoramic Desert Hills",
        morning: {
          activity: "Amer Fort & Sheesh Mahal Tour",
          description: "Ascend the royal ramparts, admire mirror mosaic chambers, and explore subterranean tunnels.",
          insiderTip: "Carry water and visit early before the afternoon desert sun warms the stones.",
        },
        afternoon: {
          activity: "Jaigarh Fort Cannon & Anokhi Textile Museum",
          description: "See the world's largest wheeled cannon (Jaivana) and watch woodblock carvers at work.",
          insiderTip: "Try stamping your own cotton handkerchief at the Anokhi workshop.",
        },
        evening: {
          activity: "Nahargarh Fort Padao Sunset Dinner",
          description: "Sip mocktails or cold drinks while watching twinkling city lights spread across the plain.",
          insiderTip: "Arrive by 5:00 PM to secure prime edge tables.",
        },
      },
      {
        title: "Artisan Bazaars & Traditional Rajasthani Feast",
        theme: "Colors, Keepsakes & Royal Dining",
        morning: {
          activity: "Albert Hall Museum & Ram Niwas Gardens",
          description: "Admire Indo-Saracenic architecture, Persian carpets, and miniature Rajput paintings.",
          insiderTip: "Feed the flocking pigeons outside for timeless holiday photos.",
        },
        afternoon: {
          activity: "Shopping in Johari & Bapu Bazaars",
          description: "Bargain respectfully for genuine Jaipuri quilts, mojris, and handmade lac bangles.",
          insiderTip: "Ask shopkeepers for GI-tagged Sanganeri block-print fabrics.",
        },
        evening: {
          activity: "Chokhi Dhani or 1135 AD Royal Dinner",
          description: "Feast on dal baati churma and gatte ki sabzi in a candlelit royal dining room.",
          insiderTip: "Save room for warm Ghewar dripping with saffron syrup.",
        },
      },
    ],
    foodGuide: {
      localDishes: [
        { name: "Authentic Dal Baati Churma", description: "Baked wheat balls soaked in pure desi ghee with spiced lentil curry and sweetened powdered crumble.", spot: "Rawat Mishthan Bhandar / LMB" },
        { name: "Laal Maas", description: "Fierce Rajput mutton curry simmered with fiery Mathania red chilies and garlic paste.", spot: "1135 AD / Niros" },
        { name: "Pyaz Kachori & Mawa Kachori", description: "Flaky crisp pastry stuffed with savory caramelized onions or sweet reduced milk.", spot: "Rawat Mishthan Bhandar" },
      ],
      vegetarianOptions: [
        { name: "Gatte Ki Sabzi", description: "Steamed gram flour dumplings in a rich yogurt and whole spice gravy." },
        { name: "Ker Sangri", description: "Traditional desert bean and dried berry delicacy sautéed with mustard oil and fenugreek." },
        { name: "Papad Mangodi Kadhi", description: "Comforting sour yogurt curry with roasted papad and sun-dried lentil nuggets." },
      ],
      budgetFoodSuggestions: [
        { name: "Laxmi Mishthan Bhandar (LMB) Street Snacks", description: "Famous kachoris, mirchi vada, and fresh lassi in clay kulhads.", priceRange: "₹80 - ₹160" },
        { name: "MI Road Lassi Stalls", description: "Thick creamy curd lassi topped with thick malai in earthen pots.", priceRange: "₹50 - ₹90" },
      ],
      premiumFoodSuggestions: [
        { name: "1135 AD (Amer Fort)", description: "Dine like royal nobility in gold-embossed halls with live sitar and sarangi music.", priceRange: "₹2,600 - ₹4,500 per person" },
        { name: "Suvarna Mahal (Rambagh Palace)", description: "Florentine ceilings and crystal chandeliers serving regal recipes from royal princely states.", priceRange: "₹3,500 - ₹6,000 per person" },
      ],
    },
    packingAdditions: [
      "Lightweight cotton shirts & breathable scarves (for sun & dust protection)",
      "Comfortable flat walking shoes or sneakers for fort ramparts",
      "Wide-brim sun hat & UV sunglasses",
      "Electrolyte drink powder sachets for daytime desert warmth",
      "Camera with wide-angle lens for grand fort architecture",
    ],
  },
};

/**
 * Fallback contextual generator for any custom destination entered by the user
 */
function createCustomDestinationData(destination: string): DestinationData {
  const destClean = destination.trim();
  return {
    heroTagline: `Curated exploration of ${destClean} with scenic landmarks, regional dining, and bespoke experiences`,
    recommendedArea: `Central ${destClean} or Old Town Heritage District`,
    hotelName: `Grand ${destClean} Horizon Hotel & Suites`,
    hotelCategory: "Contemporary Boutique Hotel (4-Star)",
    hotelNightlyRate: 4500,
    flightBasePerPerson: 5500,
    places: [
      {
        id: "p1",
        name: `${destClean} Historic Center & Landmark Square`,
        shortDescription: `Central district featuring prime architectural monuments, bustling streets, and local heritage.`,
        suggestedDuration: "3 hours",
        bestTimeToVisit: "Morning 9:30 AM",
        category: "Landmarks & Culture",
        highlightTag: "Must-See",
      },
      {
        id: "p2",
        name: `${destClean} Scenic Viewpoint & Promenade`,
        shortDescription: `Elevated observation area offering sweeping panoramic views across the city skyline and landscapes.`,
        suggestedDuration: "2 hours",
        bestTimeToVisit: "Golden hour sunset",
        category: "Scenic Nature",
        highlightTag: "Photography Spot",
      },
      {
        id: "p3",
        name: `${destClean} Cultural Heritage Museum & Gardens`,
        shortDescription: `Expansive estate showcasing indigenous art, traditional craft, and tranquil shaded botanical walkways.`,
        suggestedDuration: "2.5 hours",
        bestTimeToVisit: "Early afternoon",
        category: "Art & History",
        highlightTag: "Cultural Deep Dive",
      },
      {
        id: "p4",
        name: `${destClean} Artisan Market & Bazaar`,
        shortDescription: `Vibrant shopping lanes filled with local craftsmen, handmade textiles, spices, and unique souvenirs.`,
        suggestedDuration: "2 hours",
        bestTimeToVisit: "Late afternoon 4:30 PM",
        category: "Shopping & Crafts",
        highlightTag: "Local Life",
      },
    ],
    itineraryDays: [
      {
        title: `Welcome to ${destClean} & City Orientation`,
        theme: "Arrival, Neighborhood Stroll & First Impressions",
        morning: {
          activity: "Arrival & Check-in",
          description: `Arrive in ${destClean}, transfer to your accommodation, settle in and enjoy a welcome refreshment.`,
          insiderTip: "Download offline maps for smooth navigation around the town.",
        },
        afternoon: {
          activity: `${destClean} Main Boulevard & Plaza`,
          description: `Take a gentle introductory walk through historic squares and charming neighborhood lanes.`,
          insiderTip: "Stop by a local coffee roaster or tea parlor for authentic regional refreshments.",
        },
        evening: {
          activity: "Sunset Dinner & Local Ambience",
          description: `Dine at an authentic local restaurant with regional specialties and gentle evening music.`,
          insiderTip: "Ask your server for the chef's seasonal recommendation.",
        },
      },
      {
        title: `Iconic Highlights & Scenic Vistas`,
        theme: "Major Attractions & Cultural Immersion",
        morning: {
          activity: `${destClean} Prominent Landmark & Heritage Site`,
          description: `Visit the most celebrated architectural monument and learn about the city's rich history.`,
          insiderTip: "Early morning visits have significantly smaller queues and softer light.",
        },
        afternoon: {
          activity: "Artisan Workshops & Craft Discovery",
          description: `Meet local artisans, witness traditional production techniques, and pick up unique keepsakes.`,
          insiderTip: "Support independent craftspeople directly in their studios.",
        },
        evening: {
          activity: "Elevated Viewpoint & Twilight Drinks",
          description: `Watch the sunset from the highest panoramic terrace overlooking ${destClean}.`,
          insiderTip: "Arrive 45 minutes before dusk to secure prime seating.",
        },
      },
      {
        title: `Hidden Treasures & Farewell Experiences`,
        theme: "Nature, Local Flavors & Memorabilia",
        morning: {
          activity: "Nature Walk or Botanical Gardens",
          description: `Enjoy a crisp morning walking trail through lush parks and serene green spaces.`,
          insiderTip: "Wear comfortable walking shoes with good grip.",
        },
        afternoon: {
          activity: "Culinary Tasting Trail & Souvenirs",
          description: `Sample signature street delicacies, traditional sweets, and artisanal preserves.`,
          insiderTip: "Carry small cash denominations for street stalls.",
        },
        evening: {
          activity: "Celebratory Farewell Dinner",
          description: `Celebrate the final night of your trip with a memorable multi-course dinner.`,
          insiderTip: "Check your flight or departure schedule to organize transfers comfortably.",
        },
      },
    ],
    foodGuide: {
      localDishes: [
        { name: `${destClean} Signature Specialty`, description: `Famous regional delicacy prepared with traditional local herbs and spices.` },
        { name: `${destClean} Slow-Cooked Stew`, description: `Tender simmered dish rich in aromatic depth and local culinary heritage.` },
        { name: "Traditional Artisan Dessert", description: `Sweet confection prepared with regional dairy, nuts, and natural aromatics.` },
      ],
      vegetarianOptions: [
        { name: "Seasonal Farm Medley", description: "Locally sourced garden vegetables stewed in mild country sauce." },
        { name: "Spiced Lentil or Grain Risotto", description: "Hearty vegetarian dish seasoned with freshly roasted whole spices." },
      ],
      budgetFoodSuggestions: [
        { name: "Popular Street Food Counters", description: "Fast, flavorful local bites loved by neighborhood residents.", priceRange: "₹80 - ₹180 per person" },
        { name: "Neighborhood Family Diner", description: "Generous traditional meal plates with seasonal accompaniments.", priceRange: "₹150 - ₹300 per person" },
      ],
      premiumFoodSuggestions: [
        { name: `The Heritage Room at ${destClean}`, description: "Fine dining restaurant offering modern culinary reinterpretation of local classics.", priceRange: "₹1,800 - ₹3,200 per person" },
        { name: "Skyline Panorama Terrace", description: "Cocktail lounge and upscale dining with sweeping city night views.", priceRange: "₹2,200 - ₹3,800 per person" },
      ],
    },
    packingAdditions: [
      "Versatile layers suitable for both day and evening temperatures",
      "Reliable power bank & universal charging adapter",
      "Sturdy, broken-in walking shoes",
      "Reusable water bottle & compact umbrella",
      "Personal travel medicine kit with basic pain relief and hydration salts",
    ],
  };
}

/**
 * Synthesizes a comprehensive travel plan matching all user parameters
 */
export function generateContextualPlan(inputs: TripFormInputs): TravelPlanResult {
  const destKey = inputs.destination.trim().toLowerCase();
  
  // Find matching destination or generate contextual data
  let destData: DestinationData;
  if (destKey.includes("goa")) {
    destData = DESTINATIONS_DB.goa;
  } else if (destKey.includes("manali") || destKey.includes("himachal") || destKey.includes("shimla")) {
    destData = DESTINATIONS_DB.manali;
  } else if (destKey.includes("kerala") || destKey.includes("munnar") || destKey.includes("kochi") || destKey.includes("alleppey")) {
    destData = DESTINATIONS_DB.kerala;
  } else if (destKey.includes("jaipur") || destKey.includes("rajasthan") || destKey.includes("udaipur")) {
    destData = DESTINATIONS_DB.jaipur;
  } else {
    destData = createCustomDestinationData(inputs.destination);
  }

  const daysCount = Math.max(1, Math.min(14, Number(inputs.days) || 3));
  const travelersCount = Math.max(1, Number(inputs.travelers) || 1);
  const userBudget = Number(inputs.budget) || 45000;

  // Build Day-by-Day Itinerary for the requested number of days
  const itinerary: DayItinerary[] = [];
  for (let i = 0; i < daysCount; i++) {
    const templateDay = destData.itineraryDays[i % destData.itineraryDays.length];
    itinerary.push({
      day: i + 1,
      title: i === 0 
        ? `Day 1: Arrival & ${templateDay.theme}`
        : i === daysCount - 1
        ? `Day ${daysCount}: Highlights & Farewell`
        : `Day ${i + 1}: ${templateDay.title}`,
      theme: templateDay.theme,
      morning: templateDay.morning,
      afternoon: templateDay.afternoon,
      evening: templateDay.evening,
    });
  }

  // Cost estimates (calculated in INR)
  const estimatedFlightPerPerson = Math.round(destData.flightBasePerPerson * (inputs.from.toLowerCase() === inputs.destination.toLowerCase() ? 0.3 : 1));
  const totalFlights = estimatedFlightPerPerson * travelersCount;
  
  // Hotel rooms needed: 2 people per room
  const roomsNeeded = Math.ceil(travelersCount / 2);
  const nights = Math.max(1, daysCount - 1);
  const totalHotels = destData.hotelNightlyRate * roomsNeeded * nights;
  
  // Daily food estimate per person: ~₹1,200/day
  const totalFood = 1200 * travelersCount * daysCount;
  
  // Local transport (cabs, rentals): ~₹1,000/day
  const totalTransport = 1000 * daysCount;
  
  // Activities and sightseeing entries: ~₹800/person/day
  const totalActivities = 800 * travelersCount * daysCount;

  // Miscellaneous: emergency buffer & shopping ~₹500/day
  const totalMisc = 500 * daysCount;

  const totalEstimatedCost = totalFlights + totalHotels + totalFood + totalTransport + totalActivities + totalMisc;

  // Standard interactive packing checklist
  const basePackingList: PackingItem[] = [
    { id: "pk-1", label: "Government ID / Passport / Aadhaar", category: "Essentials", checked: false },
    { id: "pk-2", label: "Flight / Train boarding passes & Hotel booking PDFs", category: "Essentials", checked: false },
    { id: "pk-3", label: "Debit / Credit cards & emergency physical cash", category: "Essentials", checked: false },
    { id: "pk-4", label: "Comfortable all-day walking shoes / sneakers", category: "Clothing", checked: false },
    { id: "pk-5", label: "Casual comfortable daily travel outfits", category: "Clothing", checked: false },
    { id: "pk-6", label: "Nightwear & extra cotton socks", category: "Clothing", checked: false },
    { id: "pk-7", label: "Smartphone charger & high-capacity power bank", category: "Tech & Gear", checked: false },
    { id: "pk-8", label: "Earphones / AirPods for transit", category: "Tech & Gear", checked: false },
    { id: "pk-9", label: "Broad-spectrum sunscreen (SPF 50+) & lip balm", category: "Health & Care", checked: false },
    { id: "pk-10", label: "Personal prescription medications & basic first aid", category: "Health & Care", checked: false },
    { id: "pk-11", label: "Reusable stainless steel water bottle", category: "Health & Care", checked: false },
  ];

  // Add destination-specific packing items
  destData.packingAdditions.forEach((itemText, idx) => {
    basePackingList.push({
      id: `pk-dest-${idx}`,
      label: itemText,
      category: itemText.toLowerCase().includes("jacket") || itemText.toLowerCase().includes("linen") || itemText.toLowerCase().includes("cotton") ? "Clothing" : "Essentials",
      checked: false,
    });
  });

  return {
    id: `voyage-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    route: {
      from: inputs.from,
      destination: inputs.destination,
    },
    duration: daysCount,
    travelers: travelersCount,
    travelType: inputs.travelType,
    budget: userBudget,
    preferences: inputs.preferences && inputs.preferences.length > 0 ? inputs.preferences : ["Scenic Nature", "Local Food"],
    summaryHeadline: `${daysCount}-Day Curated AI Journey from ${inputs.from} to ${inputs.destination}`,
    summaryBio: `Custom-tailored for ${travelersCount} ${inputs.travelType.toLowerCase()} ${travelersCount > 1 ? 'travelers' : 'traveler'} prioritizing ${inputs.preferences.slice(0, 3).join(", ") || "cultural discovery"} with balanced pacing, authentic dining, and optimized budget allocation.`,
    flightPlan: {
      departure: `${inputs.from} (${inputs.from.substring(0, 3).toUpperCase()}) ➔ ${inputs.destination} (${inputs.destination.substring(0, 3).toUpperCase()}) · 08:30 AM Departure`,
      return: `${inputs.destination} (${inputs.destination.substring(0, 3).toUpperCase()}) ➔ ${inputs.from} (${inputs.from.substring(0, 3).toUpperCase()}) · 07:15 PM Return`,
      airline: "IndiGo / Air India / Vistara (Suggested options)",
      flightType: "Direct",
      estimatedCost: totalFlights,
      duration: "2h 15m (Estimated transit)",
      travelNotes: `Recommended departure on morning flight to maximize Day 1 sightseeing. Fares shown are realistic market estimates for planning purposes.`,
    },
    hotelPlan: {
      recommendedArea: destData.recommendedArea,
      hotelCategory: destData.hotelCategory,
      suggestedHotelName: destData.hotelName,
      numberOfNights: nights,
      estimatedCost: totalHotels,
      amenities: ["Complimentary Breakfast", "High-speed Wi-Fi", "Swimming Pool / Courtyard", "Airport Shuttle Desk", "24/7 Concierge"],
      vibe: `Centrally positioned near top sights with serene acoustic isolation and glowing traveler reviews.`,
    },
    placesToVisit: destData.places,
    itinerary,
    budgetBreakdown: {
      flights: totalFlights,
      hotels: totalHotels,
      food: totalFood,
      localTransport: totalTransport,
      activities: totalActivities,
      miscellaneous: totalMisc,
      totalEstimatedCost,
      userBudget,
      currency: "₹",
    },
    packingList: basePackingList,
    foodGuide: destData.foodGuide,
    groupPreferences: inputs.groupPreferences,
    appliedModifications: [],
    status: "Planned",
    source: "ai_simulation",
  };
}

/**
 * Modifies an existing travel plan based on selected user modifications
 */
export function applyPlanModification(plan: TravelPlanResult, modificationType: string): TravelPlanResult {
  const updated = JSON.parse(JSON.stringify(plan)) as TravelPlanResult;
  if (!updated.appliedModifications) {
    updated.appliedModifications = [];
  }

  switch (modificationType) {
    case "make_cheaper":
      // Reduce hotel by 30%, optimize flights/transport
      updated.hotelPlan.hotelCategory = "Standard Comfort Boutique (3-Star)";
      updated.hotelPlan.suggestedHotelName = `Eco Comfort Stay ${updated.route.destination}`;
      updated.hotelPlan.estimatedCost = Math.round(updated.hotelPlan.estimatedCost * 0.65);
      updated.budgetBreakdown.hotels = updated.hotelPlan.estimatedCost;
      updated.budgetBreakdown.food = Math.round(updated.budgetBreakdown.food * 0.8);
      updated.budgetBreakdown.localTransport = Math.round(updated.budgetBreakdown.localTransport * 0.7);
      updated.budgetBreakdown.totalEstimatedCost =
        updated.budgetBreakdown.flights +
        updated.budgetBreakdown.hotels +
        updated.budgetBreakdown.food +
        updated.budgetBreakdown.localTransport +
        updated.budgetBreakdown.activities +
        updated.budgetBreakdown.miscellaneous;
      updated.appliedModifications.push("💰 Budget Optimized: Switched to verified budget-friendly boutique stays and smart dining.");
      break;

    case "upgrade_hotels":
      updated.hotelPlan.hotelCategory = "Luxury Heritage & Spa (5-Star)";
      updated.hotelPlan.suggestedHotelName = `The Grand Palatial Resort & Spa ${updated.route.destination}`;
      updated.hotelPlan.estimatedCost = Math.round(updated.hotelPlan.estimatedCost * 1.6);
      updated.hotelPlan.amenities.push("Infinity Pool Access", "Private Butler Service", "Complimentary Spa Credit");
      updated.budgetBreakdown.hotels = updated.hotelPlan.estimatedCost;
      updated.budgetBreakdown.totalEstimatedCost =
        updated.budgetBreakdown.flights +
        updated.budgetBreakdown.hotels +
        updated.budgetBreakdown.food +
        updated.budgetBreakdown.localTransport +
        updated.budgetBreakdown.activities +
        updated.budgetBreakdown.miscellaneous;
      updated.appliedModifications.push("🏨 Hotel Upgraded: Elevated to 5-Star luxury resort with spa privileges.");
      break;

    case "more_adventure":
      updated.preferences = Array.from(new Set([...updated.preferences, "Adventure Seeker"]));
      updated.placesToVisit.unshift({
        id: `adv-${Date.now()}`,
        name: `High-Adrenaline Outdoor Trail & Zip-lining`,
        shortDescription: `Thrilling guided canyon expedition, suspension rope walks, and terrain-vehicle exploration.`,
        suggestedDuration: "3.5 hours",
        bestTimeToVisit: "Morning 08:30 AM",
        category: "Extreme Adventure",
        highlightTag: "Adrenaline Rush",
      });
      updated.appliedModifications.push("🎢 Adventure Boost: Injected high-thrill outdoor trails and adventure excursions.");
      break;

    case "more_beaches":
      updated.preferences = Array.from(new Set([...updated.preferences, "Beach Lover"]));
      updated.placesToVisit.unshift({
        id: `bch-${Date.now()}`,
        name: `Secret Cove & Coral Snorkeling Bay`,
        shortDescription: `Secluded white-sand lagoon with crystalline shallows, coral reefs, and sunset kayak tours.`,
        suggestedDuration: "3 hours",
        bestTimeToVisit: "10:00 AM – 2:00 PM",
        category: "Beaches & Water",
        highlightTag: "Hidden Beach",
      });
      updated.appliedModifications.push("🏖️ Beach Infusion: Added secluded coastal coves and sunset watersports.");
      break;

    case "more_food":
      updated.preferences = Array.from(new Set([...updated.preferences, "Foodie"]));
      updated.foodGuide.localDishes.unshift({
        name: "Chef's Secret Heritage Tasting Menu",
        description: "Eight-course tasting journey through forgotten ancestral recipes with paired artisanal drinks.",
        spot: "Historic Old Town Dining Room",
      });
      updated.appliedModifications.push("🍴 Culinary Expansion: Enriched itinerary with secret food trails and chef tasting menus.");
      break;

    case "photography_spots":
      updated.preferences = Array.from(new Set([...updated.preferences, "Photographer"]));
      updated.placesToVisit.unshift({
        id: `photo-${Date.now()}`,
        name: `Sunrise Clifftop & Heritage Arch Viewpoint`,
        shortDescription: `Spectacular vantage point offering dramatic golden hour lighting, mist layers, and iconic silhouettes.`,
        suggestedDuration: "2 hours",
        bestTimeToVisit: "Dawn 05:45 AM",
        category: "Photography Spot",
        highlightTag: "Golden Hour Classic",
      });
      updated.appliedModifications.push("📸 Photography Focus: Added sunrise golden-hour viewpoints and architecture photowalks.");
      break;

    case "more_relaxing":
      updated.preferences = Array.from(new Set([...updated.preferences, "Relaxed Traveler"]));
      updated.itinerary.forEach((day) => {
        day.afternoon.activity = "Leisure Poolside Hours & Herbal Aromatherapy";
        day.afternoon.description = "Unstructured slow downtime with iced refreshments, garden hammocks, and book reading.";
      });
      updated.appliedModifications.push("😌 Relaxation Mode: Re-balanced pacing with leisurely afternoons and spa sessions.");
      break;

    case "change_duration":
      // Add 1 extra day to trip
      const newDayNum = updated.duration + 1;
      updated.duration = newDayNum;
      updated.itinerary.push({
        day: newDayNum,
        title: `Day ${newDayNum}: Deep Exploration & Extended Leisure`,
        theme: "Extra Hidden Trails & Serene Farewell",
        morning: {
          activity: "Slow Morning Cafe & Boutique Discovery",
          description: "Sleep in, enjoy a lazy brunch, and revisit your favorite corner of the town.",
          insiderTip: "Pack leisurely without rush.",
        },
        afternoon: {
          activity: "Scenic Countryside Bicycle Excursion",
          description: "Pedal along peaceful rural trails, orchards, and village canals.",
          insiderTip: "Rent an electric bike for effortless climbs.",
        },
        evening: {
          activity: "Final Rooftop Sunset Toast",
          description: "Celebrate the extended trip with a private candlelit dinner under starry skies.",
          insiderTip: "Double-check your tickets for next morning's travel.",
        },
      });
      updated.budgetBreakdown.hotels += Math.round(updated.budgetBreakdown.hotels / (newDayNum - 1));
      updated.budgetBreakdown.food += 1200 * updated.travelers;
      updated.budgetBreakdown.totalEstimatedCost =
        updated.budgetBreakdown.flights +
        updated.budgetBreakdown.hotels +
        updated.budgetBreakdown.food +
        updated.budgetBreakdown.localTransport +
        updated.budgetBreakdown.activities +
        updated.budgetBreakdown.miscellaneous;
      updated.appliedModifications.push(`📅 Duration Extended: Added Day ${newDayNum} with country cycling and relaxed pacing.`);
      break;

    default:
      break;
  }

  return updated;
}
