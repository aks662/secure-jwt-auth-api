
// for local deployment use this connection string
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require("@prisma/adapter-pg");
const { env } = require("prisma/config");

const adapter = new PrismaPg({ 
  connectionString: `${process.env.DATABASE_URL}`, 
});

// for cloud deployment use this connection string
// const { Pool } = require("pg");
// const pool = new Pool({ connectionString });
// const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

module.exports =   prisma ;
