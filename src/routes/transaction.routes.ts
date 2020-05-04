import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const balance = transactionsRepository.getBalance();
    const listTransactions = transactionsRepository.all();
    const transactions = { transactions: listTransactions, balance };

    return response.json(transactions);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    createTransaction.execute({
      title,
      value,
      type,
    });

    const balance = transactionsRepository.getBalance();
    const listTransactions = transactionsRepository.all();
    const transactions = { transactions: listTransactions, balance };

    return response.json(transactions);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
