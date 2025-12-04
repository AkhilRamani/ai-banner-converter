import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Reset credits on the 1st of every month at midnight UTC
crons.monthly(
    "reset monthly credits",
    { day: 1, hourUTC: 0, minuteUTC: 0 },
    internal.functions.creditResets.resetMonthlyCredits
);

export default crons;
