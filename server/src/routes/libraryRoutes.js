import express from "express";
import {
    addToLibrary,
    getLibrary,
    updateLibraryItem,
    deleteLibraryItem
} from "../controllers/libraryController.js";
import { protectRoute } from "../middlewares/auth.js";

const libraryRouter = express.Router();

libraryRouter.post("/", protectRoute, addToLibrary);
libraryRouter.get("/", protectRoute, getLibrary);
libraryRouter.patch("/:id", protectRoute, updateLibraryItem);
libraryRouter.delete("/:id", protectRoute, deleteLibraryItem);

export default libraryRouter;