import Database from "better-sqlite3";

const db = Database('./db/data.db', {verbose:console.log})

let quotes = [
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    firstName: "Nelson",
    lastName: "Mandela",
    age: "Dead",
    image:
      "https://usercontent.one/wp/bahrainrights.net/wp-content/uploads/2021/07/photo-by-per-anders-petterssongetty-images.jpg",
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    firstName: "Walt",
    lastName: "Disney",
    age: "Dead",
    image:
      "https://traveltomorrow.com/wp-content/uploads/2021/09/79600681_10157966071680742_6683961443294904320_n.jpg",
  },
  {
    id: 3,
    text: "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.",
    firstName: "Steve",
    lastName: "Jobs",
    age: "Dead",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/800px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg",
  },
  {
    id: 4,
    text: "If life were predictable it would cease to be life, and be without flavor.",
    firstName: "Eleanor",
    lastName: "Roosevelt",
    age: "Dead",
    image:
      "https://eachother.org.uk/wp-content/uploads/2017/09/eleanorroosevelt_640x400-1.jpg",
  },
  {
    id: 5,
    text: "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    firstName: "Oprah",
    lastName: "Winfrey",
    age: "68",
    image:
      "https://cdn.24.co.za/files/Cms/General/d/3804/bf171f9ddf6042afb96eb6d8d4db7be2.jpg",
  },
  {
    id: 6,
    text: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    firstName: "James",
    lastName: "Cameron",
    age: "68",
    image:
      "https://media.vanityfair.com/photos/6228c9384471a41eee974302/master/w_2560%2Cc_limit/1272463077",
  },
  {
    id: 7,
    text: "Life is what happens when you're busy making other plans.",
    firstName: "John",
    lastName: "Lennon",
    age: "Dead",
    image: "https://static.dw.com/image/16355716_403.jpg",
  },
  {
    id: 8,
    text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
    firstName: "Mother",
    lastName: "Teresa",
    age: "Dead",
    image:
      "https://cdn.shopify.com/s/files/1/0591/9493/articles/Mother-Teresa.jpg?v=1603297536",
  },
  {
    id: 9,
    text: "When you reach the end of your rope, tie a knot in it and hang on.",
    firstName: "Franklin",
    lastName: "D. Roosevelt",
    age: "Dead",
    image:
      "https://www.history.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_faces:center%2Cq_auto:good%2Cw_768/MTg2NTM2MjIzMDM5MzAxNDY5/gettyimages-3437022.jpg",
  },
  {
    id: 10,
    text: "Always remember that you are absolutely unique. Just like everyone else.",
    firstName: "Margaret",
    lastName: "Mead",
    age: "Dead",
    image:
      "https://www.history.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc5MDg1MzU2MDk4ODg5/margaret-mead-posing-for-a-photo.jpg",
  },
  {
    id: 11,
    text: "Don't judge each day by the harvest you reap but by the seeds that you plant.",
    firstName: "Robert",
    lastName: "Louis Stevenson",
    age: "Dead",
    image:
      "https://www.businessdestinations.com/wp-content/uploads/2017/08/Robert-Louis-Stevenson-1.jpg",
  },
];

const dropTableQuotes= db.prepare(`
DROP TABLE IF EXISTS quotes;
`)
dropTableQuotes.run()

const createQuotesTabble = db.prepare(`
  CREATE TABLE IF NOT EXISTS quotes(
    id INTEGER,
    text TEXT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    age TEXT NOT NULL,
    image TEXT NOT NULL,
    PRIMARY KEY (id)
  );
`)
createQuotesTabble.run();


const createQuote= db.prepare(`
 INSERT INTO quotes(text,firstName,lastName,age,image) VALUES(?,?,?,?,?)
`)
for(let quote of quotes){
   createQuote.run(quote.text,quote.firstName,quote.lastName,quote.age,quote.image)
}