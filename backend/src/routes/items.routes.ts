import { Router } from "express";

import {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
} from '../controllers/items.controller';

import {authenticateToken} from '../middlewares/auth.middleware'

const router = Router();

router.get('/', authenticateToken, getItems)
router.get('/:id', authenticateToken, getItemById)
router.get('/', authenticateToken, createItem)
router.get('/:id', authenticateToken, updateItem)
router.get('/:id', authenticateToken, deleteItem)

export default router;