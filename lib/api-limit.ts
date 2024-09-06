import { auth } from "@clerk/nextjs/server";

import { MAX_FREE_COUNTS } from "@/constants";

import { db } from "@/lib/db";

export const increaseApiLimit = async () => {
  const { userId } = auth();

  if (!userId) return;

  const userApiLimit = await db.userApiLimit.findUnique({
    where: {
      userId: "user_2fPy48mLKFpggPaEeOnn6apnZ9d",
    },
  });
  

  if (userApiLimit) {
    await db.userApiLimit.update({
      where: {
        userId,
      },
      data: {
        count: userApiLimit.count + 1,
      },
    });
  } else {
    await db.userApiLimit.create({
      data: { userId, count: 1 },
    });
  }
};

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