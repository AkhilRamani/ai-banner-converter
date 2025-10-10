import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { platformValidator, formatResultStatusValidator } from "./schema";
import { requireAuth, requireConversionOwnership } from "./auth";
import { r2 } from "./r2";
