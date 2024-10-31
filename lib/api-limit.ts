import { auth } from "@clerk/nextjs/server";
import { MAX_FREE_COUNTS } from "@/constants";
import { db } from "@/lib/db";

// Function to increase API limit or create new record if none exists
export const increaseApiLimit = async () => {
  const { userId } = auth();

  if (!userId) return;

  await db.userApiLimit.upsert({
    where: {
      userId,
    },
    update: {
      count: { increment: 1 }, // Increment count if userId record exists
    },
    create: {
      userId,
      count: 1, // Initial count if no record exists for this userId
    },
  });
};

// Function to check if user has remaining API calls within free limit
export const checkApiLimit = async () => {
  const { userId } = auth();

  if (!userId) return false;

  const userApiLimit = await db.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  return !userApiLimit || userApiLimit.count < MAX_FREE_COUNTS;
};

// Function to get current API count for a user
export const getApiLimitCount = async () => {
  const { userId } = auth();

  if (!userId) return 0;

  const userApiLimit = await db.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!userApiLimit) return 0;

  return userApiLimit.count;
};
