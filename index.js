require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { body, validationResult, oneOf } = require('express-validator');
const { Investor } = require('./models');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const SERVER_PORT = process.env.SERVER_PORT || 3000;

const valudateBody = [
  oneOf(
    [
      body('name').exists(),
      body('email').exists(),
      body('allocation').exists(),
      body('equity').exists(),
    ],
  ),
  body('name').isString().trim().optional({ nullable: true }),
  body('email').isEmail().trim().notEmpty(),
  body('allocation').toInt().isInt().optional({ nullable: true }).default(0),
  body('equity').toInt().isInt().optional({ nullable: true }).default(0),
];

app.get(
  '/investors',
  async (req, res) => {
    try {
      const investors = await Investor.findAll({ order: [['id', 'ASC']] });

      return res.status(200).json({ investors })
    } catch (err) {
      res.status(500).json({ errors: ['failed to get investors'] })
    }
  }
)

app.post(
  '/investors',
  ...valudateBody,
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

      const investor = await Investor.create(req.body)

      return res.status(201).json({ investor })
    } catch (err) {
      res.status(500).json({ errors: ['failed to create investor'] })
    }
  }
);

app.put(
  '/investors/:id',
  ...valudateBody,
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

      const investor = await Investor.findByPk(req.params.id)

      if (!investor) return res.status(404).json({ errors: ['investor not found'] })

      await investor.update(req.body)

      return res.status(200).json({ investor })
    } catch (err) {
      res.status(500).json({ errors: ['failed to update investor'] })
    }
  }
);

app.listen({ port: SERVER_PORT }, () => {
  console.log(`app is running on port ${SERVER_PORT}`);
});
