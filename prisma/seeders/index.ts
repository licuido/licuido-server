import {
  PrismaClient,
  master_entity_types,
  master_regions,
  master_countries,
  master_business_sectors,
  master_position,
  master_wallet_types,
  master_investor_types,
  master_token_type,
  master_token_status,
  master_blockchain_networks,
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
    //Master Business sectors

    if (seed.table == "master_business_sectors") {
      seed.data.forEach((data: master_business_sectors) => {
        upsertPromises.push(
          prisma.master_business_sectors.upsert({
            where: { id: data.id },
            update: data,
            create: data,
          })
        );
      });
    }

    //Master Position
    if (seed.table == "master_position") {
      seed.data.forEach((data: master_position) => {
        upsertPromises.push(
          prisma.master_position.upsert({
            where: { id: data.id },
            update: data,
            create: data,
          })
        );
      });
    }

    if (seed.table == "master_wallet_types") {
      seed.data.forEach((data: master_wallet_types) => {
        upsertPromises.push(
          prisma.master_wallet_types.upsert({
            where: { id: data.id },
            update: data,
            create: data,
          })
        );
      });
    }

    if (seed.table == "master_investor_types") {
      seed.data.forEach((data: master_investor_types) => {
        upsertPromises.push(
          prisma.master_investor_types.upsert({
            where: { id: data.id },
            update: data,
            create: data,
          })
        );
      });
    }

    //master token types
    if (seed.table === "master_token_type") {
      seed.data.forEach((data: master_token_type) => {
        upsertPromises.push(
          prisma.master_token_type.upsert({
            where: { id: data.id },
            update: data,
            create: data,
          })
        );
      });
    }
    //master token status
    if (seed.table === "master_token_status") {
      seed.data.forEach((data: master_token_status) => {
        upsertPromises.push(
          prisma.master_token_status.upsert({
            where: { id: data.id },
            update: data,
            create: data,
          })
        );
      });
    }
    //master block chain network
    if (seed.table === "master_blockchain_networks") {
      seed.data.forEach((data: master_blockchain_networks) => {
        upsertPromises.push(
          prisma.master_blockchain_networks.upsert({
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
