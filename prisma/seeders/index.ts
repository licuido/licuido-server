import {
  PrismaClient,
  master_entity_types,
  master_regions,
  master_countries,
} from "@prisma/client";

const prisma = new PrismaClient();
import * as Seeds from "./seed";

const main = async () => {
  console.log("---- Seeding In Progress ----");

  let upsertPromises: any[] = [];

  Object.values(Seeds).forEach((seed: { table: string; data: any[] }) => {
    // Master User Entity Types
    if (seed.table == "master_entity_types") {
      seed.data.forEach((data: master_entity_types) => {
        upsertPromises.push(
          prisma.master_entity_types.upsert({
            where: { id: data.id },
            update: data,
            create: data,
          })
        );
      });
    }
    //Master regions
    if (seed.table == "master_regions") {
      seed.data.forEach((data: master_regions) => {
        upsertPromises.push(
          prisma.master_regions.upsert({
            where: { id: data.id },
            update: data,
            create: data,
          })
        );
      });
    }
    //Master countries
    if (seed.table == "master_countries") {
      seed.data.forEach((data: master_countries) => {
        upsertPromises.push(
          prisma.master_countries.upsert({
            where: { id: data.id },
            update: data,
            create: data,
          })
        );
      });
    }
  });

  await Promise.all(upsertPromises);

  console.log("---- Seeding Completed ----");
};
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
