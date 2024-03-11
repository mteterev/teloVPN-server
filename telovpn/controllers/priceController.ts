// const db = require('../db');

import {
  addPriceService,
  deletePriceService,
  getPriceByIdService,
  getPriceService,
} from '../services/price.service';

const getPriceController = async (req, res) => {
  const promocode = req.params.promocode;

  try {
    const price = await getPriceService({ promocode });
    res.status(200).json(price);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

const addPriceController = async (req, res) => {
  const {
    promocode,
    month1,
    month2,
    month3,
    month6,
    month12,
    end_date,
    validity,
  } = req.body;

  try {
    const price = await addPriceService({
      promocode,
      month1,
      month2,
      month3,
      month6,
      month12,
      end_date,
      validity,
    });
    res.status(200).json(price);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

const getPriceByIdController = async (req, res) => {
  const id = req.params.id;

  try {
    const price = await getPriceByIdService(id);
    res
      .status(200)
      .json({
        month1: price?.month1,
        month2: price?.month2,
        month3: price?.month3,
        month6: price?.month6,
        month12: price?.month12,
      });
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

const deletePriceController = async (req, res) => {
  const promocode = req.params.promocode;

  try {
    const price = await deletePriceService({ promocode });
    res.status(200).json(price);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const priceController = {
  getPrice: getPriceController,
  addPrice: addPriceController,
  getPriceById: getPriceByIdController,
  deletePrice: deletePriceController,
};
