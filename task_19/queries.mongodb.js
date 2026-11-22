use("sample_mflix");

// Q1 - Find Action movies released in 2015
db.movies.find({
  year: 2015,
  genres: "Action",
  runtime: { $gt: 120 }
});

// Q2 - Christopher Nolan movies
db.movies.find(
  { directors: "Christopher Nolan" },
  { title: 1, year: 1, runtime: 1, _id: 0 }
).sort({ year: -1 });

// Q3 - Insert a new movie
db.movies.insertOne({
  title: "Future World 2026",
  year: 2026,
  runtime: 135,
  rated: "PG-13",
  type: "movie",
  genres: ["Action", "Sci-Fi"],
  num_mflix_comments: 0
});

// Q4 - Update movies
db.movies.updateMany(
  { year: 2014, num_mflix_comments: { $gt: 5 } },
  {
    $set: { isPopular: true },
    $inc: { num_mflix_comments: 1 }
  }
);

// Q5 - Delete movies
db.movies.deleteMany({
  year: { $lt: 1920 },
  runtime: { $lt: 30 }
});

// Q6 - Aggregation
db.movies.aggregate([
  { $match: { year: { $gte: 2010 } } },
  {
    $group: {
      _id: "$year",
      totalMovies: { $sum: 1 },
      averageRuntime: { $avg: "$runtime" }
    }
  },
  { $sort: { _id: -1 } }
]);