import { seedDefaultContent } from "../lib/content";
import { clientPromise } from "../lib/mongodb";

async function main() {
  const force = process.argv.includes("--force");
  try {
    const result = await seedDefaultContent(force);
    console.log(`Portfolio seed: ${result}`);
  } finally {
    (await clientPromise).close();
  }
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : "Seed failed.");
  process.exitCode = 1;
});
