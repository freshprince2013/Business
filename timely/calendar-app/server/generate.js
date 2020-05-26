var faker = require('faker');

var database = { events: []};

for (var i = 1; i<= 100; i++) {
  database.events.push({
    id: faker.random.uuid(),
    name: faker.lorem.word(),
    description: faker.lorem.sentence(),
    imageUrl: faker.image.avatar(),
    date: faker.date.recent()
  });
}

console.log(JSON.stringify(database));
